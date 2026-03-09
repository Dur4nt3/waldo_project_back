import { prisma } from '../../lib/prisma';

// ------------ SELECT QUERIES ------------

export async function getBreakpoint(screenWidth: number) {
    try {
        const breakpoint = await prisma.breakpoint.findFirst({
            where: {
                AND: [
                    {
                        minimumWidthPx: {
                            lte: screenWidth,
                        },
                    },
                    {
                        maximumWidthPx: {
                            gte: screenWidth,
                        },
                    },
                ],
            },
        });

        return breakpoint;
    } catch (error) {
        console.error('------------------Logged Error------------------\n');
        console.error('Error occurred when attempting to find breakpoint\n');
        console.error(error, '\n');
        console.error('------------------Logged Error------------------\n');
        return null;
    }
}

export async function getLevelCount() {
    try {
        const levelCount = await prisma.level.count({
            where: {
                orderIndex: {
                    not: null,
                },
            },
        });

        return levelCount;
    } catch (error) {
        console.error('------------------Logged Error------------------\n');
        console.error('Error occurred when attempting to get level count\n');
        console.error(error, '\n');
        console.error('------------------Logged Error------------------\n');
        return null;
    }
}

// ------------ SELECT QUERIES ------------

// ------------ INSERT QUERIES ------------

export async function insertPlayer(name: string) {
    try {
        const player = await prisma.player.create({
            data: {
                name,
            },
        });

        return player;
    } catch (error) {
        console.error('------------------Logged Error------------------\n');
        console.error('Error occurred when attempting to insert player\n');
        console.error(error, '\n');
        console.error('------------------Logged Error------------------\n');
        return null;
    }
}

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
