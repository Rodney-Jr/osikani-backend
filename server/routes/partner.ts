import { Router } from 'express';
import { requestPartnerAccount, loginPartner, getPartnerProfile, getAllPartners, updatePartnerStatus, updatePartnerBranding } from '../services/partnerService';

const router = Router();

// Register
router.post('/register', async (req, res) => {
    const { name, type, email, password } = req.body;
    try {
        const org = await requestPartnerAccount(name, type, email, password);
        res.json({ message: "Registration successful. Please wait for admin approval.", orgId: org.id });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const org = await loginPartner(email, password);
        res.json({ message: "Login successful", token: "mock_token_" + org.id, org });
    } catch (e: any) {
        res.status(401).json({ error: e.message });
    }
});

// Branding Route
router.post('/branding', async (req, res) => {
    const { id, config } = req.body;
    try {
        const org = await updatePartnerBranding(id, config);
        res.json({ message: "Branding updated", org });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// Profile (Protected Mock)
// Note: This needs to be correctly closed before new routes
router.get('/:id', async (req, res) => {
    try {
        const profile = await getPartnerProfile(req.params.id);
        // Parse branding if exists
        if (profile && profile.branding) {
            (profile as any).brandingConfig = JSON.parse(profile.branding);
        }
        res.json(profile);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// Admin Routes (Unprotected for Demo)
router.get('/admin/list', async (req, res) => {
    try {
        const partners = await getAllPartners();
        res.json(partners);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/admin/approve', async (req, res) => {
    const { id, status } = req.body;
    try {
        const org = await updatePartnerStatus(id, status || 'APPROVED');
        res.json({ message: "Status updated", org });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export const partnerRouter = router;
