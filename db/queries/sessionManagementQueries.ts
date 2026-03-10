import { prisma } from '../../lib/prisma';

// ------------ SELECT QUERIES ------------

export async function getGameSession(sessionHash: string) {
    try {
        const session = await prisma.gameSession.findUnique({
            where: {
                sessionToken: sessionHash,
            },
        });

        return session;
    } catch (error) {
        console.error('------------------Logged Error------------------\n');
        console.error('Error occurred when attempting to find session\n');
        console.error(error, '\n');
        console.error('------------------Logged Error------------------\n');
        return null;
    }
}

// ------------ SELECT QUERIES ------------

// ------------ INSERT QUERIES ------------

export async function insertGameSession(
    sessionHash: string,
    levelCount: number,
    playerId: number,
    breakpointId: number,
) {
    try {
        const session = await prisma.gameSession.create({
            data: {
                sessionToken: sessionHash,
                levelCount,
                playerId,
                breakpointId,
            },
        });

        return session;
    } catch (error) {
        console.error('------------------Logged Error------------------\n');
        console.error('Error occurred when attempting to insert session\n');
        console.error(error, '\n');
        console.error('------------------Logged Error------------------\n');
        return null;
    }
}

// ------------ INSERT QUERIES ------------
