import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Note: In a real app, use bcrypt/argon2 to hash passwords.
// For this demo/v1, we are storing plain text or simple implementation as requested.

export const requestPartnerAccount = async (name: string, type: string, email: string, password: string) => {
    // Check if exists
    const existing = await prisma.organization.findUnique({ where: { email } });
    if (existing) throw new Error("Organization with this email already exists.");

    return await prisma.organization.create({
        data: {
            name,
            type,
            email, // Used as login ID
            password,
            status: "PENDING",
            apiKey: `osikani_${uuidv4().split('-')[0]}` // Auto-generate initial API Key
        }
    });
};

export const loginPartner = async (email: string, password: string) => {
    const org = await prisma.organization.findUnique({ where: { email } });

    if (!org) throw new Error("Invalid credentials.");
    if (org.password !== password) throw new Error("Invalid credentials."); // Simple check
    if (org.status !== "APPROVED") throw new Error(`Account status: ${org.status}. Please contact support.`);

    // Return Org details (excluding sensitive if needed, but for now full object)
    return {
        id: org.id,
        name: org.name,
        type: org.type,
        email: org.email,
        apiKey: org.apiKey,
        status: org.status
    };
};

export const getPartnerProfile = async (id: string) => {
    return await prisma.organization.findUnique({
        where: { id },
        include: {
            campaigns: {
                orderBy: { createdAt: 'desc' },
                take: 5
            }
        }
    });
};

// Branding Functions
export const updatePartnerBranding = async (id: string, config: any) => {
    return await prisma.organization.update({
        where: { id },
        data: { branding: JSON.stringify(config) }
    });
};

// Admin Functions
export const getAllPartners = async () => {
    return await prisma.organization.findMany({
        orderBy: { createdAt: 'desc' }
    });
};

export const updatePartnerStatus = async (id: string, status: string) => {
    return await prisma.organization.update({
        where: { id },
        data: { status }
    });
};
