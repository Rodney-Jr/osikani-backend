import { Router } from 'express';
import { requestPartnerAccount, getPartnerProfile, getAllPartners, updatePartnerStatus, updatePartnerBranding } from '../services/partnerService';
import { loginPartner } from '../services/authService';
import { authenticateToken, requireAdmin } from '../middleware/auth';

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
        const { token, org } = await loginPartner(email, password);
        res.json({ message: "Login successful", token, org });
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

// Admin Routes (Protected)
router.get('/admin/list', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const partners = await getAllPartners();
        res.json(partners);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/admin/approve', authenticateToken, requireAdmin, async (req, res) => {
    const { id, status } = req.body;
    try {
        const org = await updatePartnerStatus(id, status || 'APPROVED');
        res.json({ message: "Status updated", org });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export const partnerRouter = router;
