
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/impact/stats
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalMessages = await prisma.campaignLog.count(); // Using campaign logs as proxy for now or add message log table later

        // 1. Gender Distribution
        const genderStats = await prisma.profile.groupBy({
            by: ['gender'],
            _count: {
                userId: true
            }
        });

        // 2. Location Distribution (Top 10)
        const locationStats = await prisma.profile.groupBy({
            by: ['location'],
            _count: {
                userId: true
            },
            orderBy: {
                _count: {
                    userId: 'desc'
                }
            },
            take: 10
        });

        // 3. Business Type Distribution
        const businessStats = await prisma.profile.groupBy({
            by: ['businessType'],
            _count: {
                userId: true
            },
            orderBy: {
                _count: {
                    userId: 'desc'
                }
            },
            take: 10
        });

        // 4. Age Distribution (Buckets)
        // Prisma groupBy doesn't do buckets easily, so we might need raw query or fetch all ages
        // For MVP, we'll fetch all ages and bucket in JS (assuming < 10k users for now)
        const ageProfiles = await prisma.profile.findMany({
            select: { age: true },
            where: { age: { not: null } }
        });

        const ageBuckets = {
            '18-24': 0,
            '25-34': 0,
            '35-44': 0,
            '45+': 0
        };

        ageProfiles.forEach(p => {
            if (!p.age) return;
            if (p.age >= 18 && p.age <= 24) ageBuckets['18-24']++;
            else if (p.age >= 25 && p.age <= 34) ageBuckets['25-34']++;
            else if (p.age >= 35 && p.age <= 44) ageBuckets['35-44']++;
            else if (p.age >= 45) ageBuckets['45+']++;
        });

        res.json({
            success: true,
            data: {
                totalUsers,
                totalMessages, // Placeholder
                gender: genderStats.map(g => ({ name: g.gender || 'Unknown', value: g._count.userId })),
                location: locationStats.map(l => ({ name: l.location || 'Unknown', value: l._count.userId })),
                business: businessStats.map(b => ({ name: b.businessType || 'Unknown', value: b._count.userId })),
                age: Object.entries(ageBuckets).map(([name, value]) => ({ name, value }))
            }
        });

    } catch (error) {
        console.error("Error fetching impact stats:", error);
        res.status(500).json({ success: false, message: "Failed to fetch stats" });
    }
});

export { router as impactRouter };
