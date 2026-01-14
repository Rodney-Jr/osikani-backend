
import { PrismaClient } from '@prisma/client';
import { SubscriptionTier, ProductType } from '../../types';

const prisma = new PrismaClient();

/**
 * Get a user's current subscription status.
 */
export const getSubscription = async (userId: string) => {
    return await prisma.subscription.findUnique({
        where: { userId }
    });
};

/**
 * Upgrade or Downgrade a user's subscription.
 * In a real app, this would be triggered by a webhook from a payment provider.
 */
export const upgradeSubscription = async (userId: string, tier: SubscriptionTier) => {
    console.log(`Upgrading user ${userId} to ${tier}`);
    return await prisma.subscription.upsert({
        where: { userId },
        update: {
            tier,
            isActive: true,
            updatedAt: new Date()
        },
        create: {
            userId,
            tier,
            isActive: true
        }
    });
};

/**
 * List available digital products.
 */
export const listProducts = async (type?: ProductType) => {
    return await prisma.product.findMany({
        where: {
            isActive: true,
            ...(type ? { type } : {})
        },
        orderBy: { price: 'asc' }
    });
};

/**
 * Record a product purchase.
 */
export const purchaseProduct = async (userId: string, productId: string, amount: number) => {
    // 1. Verify Product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

    // 2. Create Purchase Record
    const purchase = await prisma.purchase.create({
        data: {
            userId,
            productId,
            amount, // Should match product.price in a real transaction verification
            status: 'COMPLETED',
            transactionId: `TXN-${Date.now()}` // Mock Transaction ID
        },
        include: { product: true }
    });

    return purchase;
};

/**
 * Check if a user has access to a specific feature or content.
 */
export const checkAccess = async (userId: string, requiredTier: SubscriptionTier) => {
    const sub = await getSubscription(userId);
    const tierLevels = { [SubscriptionTier.BASIC]: 0, [SubscriptionTier.PLUS]: 1, [SubscriptionTier.PRO]: 2 };

    const userLevel = sub ? tierLevels[sub.tier] : 0;
    const requiredLevel = tierLevels[requiredTier];

    return userLevel >= requiredLevel;
};
