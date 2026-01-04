import { PrismaClient } from '@prisma/client';
import { sendMessage } from '../routes/whatsapp-cloud';

const prisma = new PrismaClient();

export const createOrganization = async (name: string, type: string, email: string) => {
    return await prisma.organization.create({
        data: { name, type, email }
    });
};

export const getOrganizations = async () => {
    return await prisma.organization.findMany();
};

export const createCampaign = async (orgId: string, title: string, content: string, targetCriteria: any, budget: number) => {
    return await prisma.campaign.create({
        data: {
            organizationId: orgId,
            title,
            content,
            status: 'DRAFT',
            targetCriteria: JSON.stringify(targetCriteria),
            budget
        }
    });
};

export const getCampaigns = async () => {
    return await prisma.campaign.findMany({
        include: { organization: true, logs: true }
    });
};

export const broadcastCampaign = async (campaignId: string) => {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) throw new Error("Campaign not found");

    // 1. Fetch Target Users
    // For now, simpler: All users. 
    // TODO: Implement sophisticated filtering based on JSON criteria
    const allUsers = await prisma.user.findMany();

    // Filter if needed (e.g. check profile)
    // const targets = allUsers.filter(...)
    const targets = allUsers;

    console.log(`Starting broadcast for campaign "${campaign.title}" to ${targets.length} users.`);

    // 2. Send Loop
    let sentCount = 0;

    for (const user of targets) {
        try {
            // Append an "Ad Footer" to comply with standards or just clarity
            const adContent = `📢 *AD: ${campaign.title}*\n\n${campaign.content}\n\n_Reply to learn more._`;

            await sendMessage(user.phoneNumber, adContent);

            // 3. Log
            await prisma.campaignLog.create({
                data: {
                    campaignId: campaign.id,
                    userId: user.id,
                    status: 'SENT'
                }
            });

            sentCount++;

            // Rate limit simple simulation
            await new Promise(r => setTimeout(r, 100));

        } catch (e) {
            console.error(`Failed to send to ${user.phoneNumber}`, e);
        }
    }

    // 4. Update Campaign Status
    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            status: 'ACTIVE',
            spent: sentCount * 0.05 // Mock cost: $0.05 per msg
        }
    });

    return { sent: sentCount, total: targets.length };
};

export const getCampaignStats = async (campaignId: string) => {
    const logs = await prisma.campaignLog.findMany({ where: { campaignId } });

    const sent = logs.filter(l => l.status === 'SENT' || l.status === 'DELIVERED').length;
    const engaged = logs.filter(l => l.status === 'ENGAGED').length;

    return { sent, engaged };
};
