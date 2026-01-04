import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { createGameFromContent } from '../services/gamificationService';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const router = Router();
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// POST /api/gamify/generate
// Body: { filename: string }
router.post('/generate', async (req, res) => {
    const { filename } = req.body;

    if (!filename) {
        res.status(400).json({ error: "Filename is required" });
        return;
    }

    const filePath = path.join(UPLOAD_DIR, filename);

    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: "File not found" });
        return;
    }

    try {
        let textContent = "";

        // 1. Extract Text
        if (filename.toLowerCase().endsWith('.pdf')) {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdf(dataBuffer);
            textContent = pdfData.text;
        } else {
            // Assume text/json/csv
            textContent = fs.readFileSync(filePath, 'utf-8');
        }

        if (!textContent || textContent.length < 50) {
            res.status(400).json({ error: "File content too short or empty" });
            return;
        }

        // 2. Generate Game
        // Use filename (clean) as title
        const title = filename.split('-').slice(0, -1).join('-') || filename; // Remove timestamp suffix if possible

        const game = await createGameFromContent(filename, textContent);

        res.json({
            message: "Gamification successful! 🎮",
            gameId: game.id,
            title: game.title
        });

    } catch (error: any) {
        console.error("Gamification error:", error);
        res.status(500).json({ error: "Transformation failed", details: error.message });
    }
});

export const gamificationRouter = router;
