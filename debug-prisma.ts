
import { PrismaClient, SubscriptionTier, ProductType } from '@prisma/client';

console.log("PrismaClient:", typeof PrismaClient);
console.log("SubscriptionTier:", SubscriptionTier);
console.log("ProductType:", ProductType);

const prisma = new PrismaClient();
console.log("Prisma instance created");
