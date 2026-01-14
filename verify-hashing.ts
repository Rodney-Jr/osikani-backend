
import { requestPartnerAccount } from './server/services/partnerService';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config'; // Load env vars

const prisma = new PrismaClient();

async function main() {
    const email = `test-partner-${uuidv4().split('-')[0]}@example.com`;
    const password = 'securePassword123';

    console.log(`Creating partner with email: ${email}`);

    try {
        const org = await requestPartnerAccount("Test Org", "NGO", email, password);
        console.log("Partner Created:", org.id);

        const fetchedOrg = await prisma.organization.findUnique({ where: { id: org.id } });

        if (!fetchedOrg) {
            console.error("FAILED: Could not fetch org");
            return;
        }

        console.log("Stored Password:", fetchedOrg.password);

        if (fetchedOrg.password.startsWith("$2a$") || fetchedOrg.password.startsWith("$2b$")) {
            console.log("SUCCESS: Password appears to be hashed (starts with $2).");
        } else {
            console.error("FAILED: Password is NOT hashed.");
        }

        // Cleanup
        await prisma.organization.delete({ where: { id: org.id } });
        console.log("Cleanup: Deleted test user.");

    } catch (e) {
        console.error("Error:", e);
    }
}

main();
