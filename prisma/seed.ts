
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

    // Seed Digital Products
    const products = [
        {
            title: "Financial Independence for Ghanaians",
            description: "A comprehensive guide to building wealth in the local economy. Covers savings, investments, and debt management.",
            price: 50.00,
            type: "EBOOK",
            downloadUrl: "https://osikani.com/dl/ebook-fin-freedom.pdf",
            imageUrl: "https://placehold.co/600x400/emerald/white?text=Ebook"
        },
        {
            title: "SME Cashflow Calculator",
            description: "Automated Excel template to track daily sales, expenses, and profit margins for your shop.",
            price: 80.00,
            type: "TOOL",
            downloadUrl: "https://osikani.com/dl/tool-cashflow.xlsx",
            imageUrl: "https://placehold.co/600x400/blue/white?text=Tool"
        },
        {
            title: "Retirement Planner",
            description: "Project your pension needs and see how much you need to save monthly.",
            price: 40.00,
            type: "TOOL",
            downloadUrl: "https://osikani.com/dl/tool-retirement.xlsx",
            imageUrl: "https://placehold.co/600x400/purple/white?text=Tool"
        }
    ];

    console.log('Seeding Products...');
    for (const p of products) {
        // @ts-ignore - ProductType enum might not be generated yet in types if migration running
        const existing = await prisma.product.findFirst({ where: { title: p.title } });
        if (!existing) {
            // @ts-ignore
            await prisma.product.create({
                data: {
                    title: p.title,
                    description: p.description,
                    price: p.price,
                    type: p.type as any, // Cast to any to avoid TS errors before generation
                    downloadUrl: p.downloadUrl,
                    imageUrl: p.imageUrl
                }
            });
            console.log(`Created: ${p.title}`);
        } else {
            console.log(`Skipped (Exists): ${p.title}`);
        }
    }
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
