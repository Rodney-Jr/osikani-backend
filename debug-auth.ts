
import { loginPartner } from './server/services/authService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAuth() {
    console.log("🔍 Testing DB Connection...");
    try {
        await prisma.$connect();
        console.log("✅ DB Connection Success");

        console.log("🔍 Testing Login Logic...");
        try {
            // Attempt login with seeded admin credentials
            const res = await loginPartner('admin@osikani.com', 'password123');
            console.log("✅ Login Success:", res.token ? "Token Generated" : "No Token");
        } catch (authError: any) {
            console.error("❌ Login Failed:", authError.message);
        }

    } catch (dbError: any) {
        console.error("❌ DB Connection Failed:", dbError);
    } finally {
        await prisma.$disconnect();
    }
}

testAuth();
