import { prisma } from '../../lib/prisma';

import logError from '../utilities/logError';

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
        logError('Error occurred when attempting to find breakpoint', error);
        return null;
    }
}

export async function assignScore(
    playerId: number,
    score: number,
    levelCount: number,
) {
    try {
        await prisma.player.update({
            where: {
                playerId,
            },
            data: {
                score,
                completedLevels: levelCount,
            },
        });

        return true;
    } catch (error) {
        logError('Error occurred when attempting to assign score', error);
        return false;
    }
}

export async function insertPlayer(name: string) {
    try {
        const player = await prisma.player.create({
            data: {
                name,
            },
        });

        return player;
    } catch (error) {
        logError('Error occurred when attempting to insert player', error);
        return null;
    }
}

export async function getLeaderboardPlacement(score: number) {
    try {
        const playersAhead = await prisma.player.count({
            where: {
                score: { lt: score, not: null },
            },
        });

        return playersAhead + 1;
    } catch (error) {
        logError('Error occurred when attempting to get placement', error);
        return null;
    }
}

export async function getTop10Players() {
    try {
        const top10 = await prisma.player.findMany({
            where: {
                score: {
                    not: null,
                },
            },
            orderBy: {
                score: 'asc',
            },
            take: 10,
        });

        return top10;
    } catch (error) {
        logError('Error occurred when attempting to get placements', error);
        return null;
    }
}
