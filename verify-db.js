
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    console.log("Checking DB...");
    const users = await prisma.user.findMany({
        include: { transactions: true }
    });
    console.log("Users found:", users.length);
    users.forEach(u => {
        console.log(`User ${u.phoneNumber} has ${u.transactions.length} transactions:`);
        console.log(JSON.stringify(u.transactions, null, 2));
    });
}

check().catch(e => console.error(e)).finally(() => prisma.$disconnect());
