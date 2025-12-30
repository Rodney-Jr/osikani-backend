
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ingestDocument, searchKnowledgeBase, listDocuments } from '../services/rag';

const router = Router();

// Configure storage for uploaded files
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST /api/rag/ingest
router.post('/ingest', upload.single('file'), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }

    try {
        await ingestDocument(req.file.path, req.file.originalname);
        res.json({ message: "Ingestion successful", file: req.file.originalname });
    } catch (error: any) {
        console.error("Ingestion error:", error);
        res.status(500).json({ error: "Ingestion failed", details: error.message });
    }
});

// GET /api/rag/search?q=...
router.get('/search', async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
        res.status(400).json({ error: "Query parameter 'q' required" });
        return;
    }

    const results = await searchKnowledgeBase(query);
    res.json({ results });
});

// GET /api/rag/documents
router.get('/documents', async (req, res) => {
    const documents = await listDocuments();
    res.json({ documents });
});

export const ragRouter = router;
