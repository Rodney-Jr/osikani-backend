import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const processGameMove = async (userId: string, input: string) => {
    // 1. Get Active Session
    const session = await prisma.gameSession.findFirst({
        where: { userId, status: "IN_PROGRESS" }
    });

    if (!session) return null; // No game active

    // 2. Get Module Content
    const module = await prisma.gameModule.findUnique({
        where: { id: session.moduleId }
    });
    if (!module) return null;

    const questions = JSON.parse(module.questions);
    const currentQ = questions[session.currentStep];

    // 3. Evaluate Answer
    const isCorrect = input.trim().toLowerCase() === currentQ.correctAnswer.toLowerCase();

    let responseText = "";
    if (isCorrect) {
        responseText = `✅ *Correct!* ${currentQ.explanation}\n\n🎉 +10 Osikani Coins!`;
        await prisma.gameSession.update({
            where: { id: session.id },
            data: {
                score: { increment: 10 },
                currentStep: { increment: 1 }
            }
        });

        // Add Reward Points
        // Note: Relation expects "reward" record to exist. We should upsert.
        // But for now, simple increment if exists.
        /* await prisma.reward.upsert({
             where: { userId },
             create: { userId, points: 10, badges: "[]" },
             update: { points: { increment: 10 } }
        }); */
        // Simplified for stability pending database migration
    } else {
        responseText = `❌ *Oops!* The correct answer was ${currentQ.correctAnswer}.\n${currentQ.explanation}`;
        // Move to next anyway? Or retry? Let's move next for flow.
        await prisma.gameSession.update({
            where: { id: session.id },
            data: { currentStep: { increment: 1 } }
        });
    }

    // 4. Check if Game Over
    if (session.currentStep + 1 >= questions.length) {
        await prisma.gameSession.update({
            where: { id: session.id },
            data: { status: "COMPLETED" }
        });
        return `${responseText}\n\n🏁 **Game Over!** You finished "${module.title}".`;
    }

    // 5. Serve Next Question
    const nextQ = questions[session.currentStep + 1];
    const optionsText = nextQ.options.map((o: string, i: number) =>
        `${String.fromCharCode(65 + i)}. ${o}` // A. Option
    ).join("\n");

    return `${responseText}\n\n📝 *Next Question:*\n${nextQ.question}\n\n${optionsText}`;
};
