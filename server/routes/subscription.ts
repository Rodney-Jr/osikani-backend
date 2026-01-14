
import express from 'express';
import { getSubscription, upgradeSubscription, listProducts, purchaseProduct } from '../services/subscriptionService';
import { SubscriptionTier, ProductType } from '@prisma/client';

export const subscriptionRouter = express.Router();

// Get User Subscription
subscriptionRouter.get('/user/:userId', async (req, res) => {
    try {
        const sub = await getSubscription(req.params.userId);
        res.json(sub);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch subscription' });
    }
});

// Upgrade Subscription (Mock Payment Trigger)
subscriptionRouter.post('/upgrade', async (req, res) => {
    try {
        const { userId, tier } = req.body;

        if (!['BASIC', 'PLUS', 'PRO'].includes(tier)) {
            return res.status(400).json({ error: 'Invalid Tier' });
        }

        const result = await upgradeSubscription(userId, tier as SubscriptionTier);
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to upgrade subscription' });
    }
});

// List Digital Products
subscriptionRouter.get('/products', async (req, res) => {
    try {
        const type = req.query.type as ProductType | undefined;
        const products = await listProducts(type);
        res.json(products);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Purchase Product (Mock Payment Trigger)
subscriptionRouter.post('/purchase', async (req, res) => {
    try {
        const { userId, productId, amount } = req.body;

        if (!userId || !productId || !amount) {
            return res.status(400).json({ error: 'Missing purchase details' });
        }

        const purchase = await purchaseProduct(userId, productId, Number(amount));
        res.json(purchase);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to process purchase' });
    }
});
