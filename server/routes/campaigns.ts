import { Router } from 'express';
import {
    createOrganization,
    getOrganizations,
    createCampaign,
    getCampaigns,
    broadcastCampaign
} from '../services/campaignService';

const router = Router();

// Organizations
router.get('/organizations', async (req, res) => {
    const orgs = await getOrganizations();
    res.json(orgs);
});

router.post('/organizations', async (req, res) => {
    const { name, type, email } = req.body;
    try {
        const org = await createOrganization(name, type, email);
        res.json(org);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// Campaigns
router.get('/', async (req, res) => {
    const camps = await getCampaigns();
    res.json(camps);
});

router.post('/', async (req, res) => {
    const { orgId, title, content, targetCriteria, budget } = req.body;
    try {
        const camp = await createCampaign(orgId, title, content, targetCriteria, budget);
        res.json(camp);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// Broadcast Action
router.post('/:id/broadcast', async (req, res) => {
    try {
        const result = await broadcastCampaign(req.params.id);
        res.json({ message: "Broadcast started", result });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export const campaignRouter = router;
