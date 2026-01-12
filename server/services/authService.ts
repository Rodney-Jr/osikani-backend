
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'osikani_super_secret_key_2025';

export const loginPartner = async (email: string, pass: string) => {
    const org = await prisma.organization.findUnique({ where: { email } });
    if (!org) throw new Error("Invalid credentials");

    // In production, user.password is hashed. 
    // If it's a legacy plain text (from mock), handle it, but we assume hashed now.
    const isValid = await bcrypt.compare(pass, org.password);
    if (!isValid) throw new Error("Invalid credentials");

    if (org.status !== 'APPROVED') {
        throw new Error("Account is pending approval or suspended.");
    }

    // Generate Token
    const token = jwt.sign(
        { id: org.id, email: org.email, type: org.type, name: org.name },
        SECRET_KEY,
        { expiresIn: '24h' }
    );

    return { token, org };
};

// Re-export specific admin creation if needed, but seed handles it.
