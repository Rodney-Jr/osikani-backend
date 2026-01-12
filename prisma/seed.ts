
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@osikani.com';
    const password = process.env.ADMIN_PASSWORD || 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.organization.upsert({
        where: { email },
        update: {},
        create: {
            name: 'Osikani Admin',
            email,
            password: hashedPassword,
            type: 'ADMIN',
            status: 'APPROVED',
            branding: JSON.stringify({ theme: 'dark' })
        },
    });

    console.log({ admin });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
