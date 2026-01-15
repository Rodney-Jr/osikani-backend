import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_DIR = path.join(process.cwd(), '.lancedb');
const TABLE_NAME = 'osikani_knowledge';

// Initialize Gemini for Embeddings
let client: GoogleGenerativeAI | null = null;
const getClient = () => {
    if (!client) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API Key missing");
        client = new GoogleGenerativeAI(apiKey);
    }
    return client;
};

// Helper: Clean filename transparency (remove 'file-' and timestamp suffix)
const cleanFilename = (filename: string): string => {
    return filename;
};

// Initialize DB Connection
let db: lancedb.Connection | null = null;
const getDB = async () => {
    if (!db) {
        try {
            db = await lancedb.connect(DB_DIR);
        } catch (error) {
            console.error("❌ LanceDB Connection Failed:", error);
            console.warn("⚠️ Attempting self-healing: Deleting corrupted DB directory...");

            try {
                fs.rmSync(DB_DIR, { recursive: true, force: true });
                console.log("✅ Deleted .lancedb directory. Retrying connection...");
                db = await lancedb.connect(DB_DIR);
            } catch (retryError) {
                console.error("❌ CRTICAL: LanceDB self-healing failed:", retryError);
                throw retryError; // Let it crash if recovery fails
            }
        }
    }
    return db;
};

// Helper: Get Embedding
const getEmbedding = async (text: string): Promise<number[]> => {
    const ai = getClient();
    const model = ai.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
};

// Ingest PDF
export const ingestDocument = async (filePath: string, fileName: string): Promise<void> => {
    console.log(`Processing ${fileName}...`);
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const fullText = data.text;

    // Semantic Chunking (Naive approach: 1000 chars overlap 100)
    const chunks: string[] = [];
    const chunkSize = 1000;
    const overlap = 100;

    for (let i = 0; i < fullText.length; i += (chunkSize - overlap)) {
        chunks.push(fullText.slice(i, i + chunkSize));
    }

    console.log(`Generated ${chunks.length} chunks. Generating embeddings...`);
    const dbInstance = await getDB();

    const records = [];
    for (const chunk of chunks) {
        const vector = await getEmbedding(chunk);
        records.push({
            id: uuidv4(),
            text: chunk,
            vector,
            source: fileName,
            timestamp: Date.now()
        });
    }

    // Create or Open Table
    // Schema is inferred from the first record if creating
    try {
        const table = await dbInstance.openTable(TABLE_NAME);
        await table.add(records);
    } catch (e) {
        // Table likely doesn't exist, create it
        await dbInstance.createTable(TABLE_NAME, records);
    }

    console.log(`Ingestion complete for ${fileName}`);
};

// Search
export const searchKnowledgeBase = async (query: string, limit = 3): Promise<string[]> => {
    const dbInstance = await getDB();
    try {
        const table = await dbInstance.openTable(TABLE_NAME);
        const queryVector = await getEmbedding(query);

        const results = await table.vectorSearch(queryVector)
            .limit(limit)
            .toArray();

        return results.map((r: any) => r.text as string);
    } catch (e) {
        console.warn("RAG Search failed (Table might be empty):", e);
        return [];
    }
};

// List Documents (Distinct Source)
// List Documents (File System based for MVP stability)
export const listDocuments = async (): Promise<{ name: string; size: string; date: string }[]> => {
    const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(UPLOAD_DIR)) return [];

    try {
        const files = fs.readdirSync(UPLOAD_DIR);
        // Filter out system files if any, and map to metadata
        return files.map(file => {
            const stats = fs.statSync(path.join(UPLOAD_DIR, file));
            return {
                name: file, // This currently includes the unique suffix, we might want to clean it or just show it
                size: (stats.size / 1024).toFixed(1) + ' KB',
                date: stats.birthtime.toLocaleDateString() + ' ' + stats.birthtime.toLocaleTimeString()
            };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (e) {
        console.error("Error listing documents:", e);
        return [];
    }
};
