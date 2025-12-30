
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logTransaction = async (userId: string, type: 'INCOME' | 'EXPENSE', amount: number, category: string, description?: string) => {
    try {
        console.log(`Logging ${type} for user ${userId}: ${amount}`);
        const transaction = await prisma.transaction.create({
            data: {
                userId,
                type,
                amount,
                category,
                description
            }
        });
        return { success: true, transactionId: transaction.id, message: `Saved ${type}: ${amount} GHS for ${category}.` };
    } catch (error) {
        console.error("Error logging transaction:", error);
        return { success: false, message: "Failed to save transaction." };
    }
};

export const checkLoanReadiness = async (userId: string) => {
    try {
        // Fetch last 3 months of transactions
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: threeMonthsAgo
                }
            }
        });

        const income = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
        const netCashFlow = income - expense;
        const transactionCount = transactions.length;

        // Simple scoring logic for MVP
        let score = 0;
        let verdict = "Not Ready";
        let reason = "";

        if (transactionCount < 5) {
            reason = "Not enough history. Keep recording your sales daily.";
        } else if (netCashFlow <= 0) {
            reason = "Your expenses are higher than your income. Try to reduce costs first.";
        } else {
            score = Math.min(100, (netCashFlow / 100) * 10); // Example scoring
            verdict = "Potentially Ready";
            reason = `You have a positive cash flow of ${netCashFlow} GHS over 3 months. Good job!`;
        }

        return {
            success: true,
            score,
            verdict,
            reason,
            metrics: { income, expense, count: transactionCount }
        };

    } catch (error) {
        console.error("Error checking loan readiness:", error);
        return { success: false, message: "Could not calculate score." };
    }
};

export const createSavingsGoal = async (userId: string, title: string, targetAmount: number) => {
    try {
        await prisma.goal.create({
            data: {
                userId,
                title,
                targetAmount
            }
        });
        return { success: true, message: `Created goal: ${title} for ${targetAmount} GHS.` };
    } catch (error) {
        return { success: false, message: "Failed to create goal." };
    }
}
