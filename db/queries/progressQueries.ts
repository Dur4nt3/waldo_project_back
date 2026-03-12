import { prisma } from '../../lib/prisma';

import logError from '../utilities/logError';

import type GameSessionWithProgress from '../../types/GameSessionWithProgress';
import { includeProgressData } from '../utilities/includeConfig';

export async function getCurrentProgress(
    sessionHash: string,
): Promise<GameSessionWithProgress | null> {
    try {
        const progress = await prisma.gameSession.findUnique({
            where: {
                sessionToken: sessionHash,
            },
            include: includeProgressData,
        });

        return progress;
    } catch (error) {
        logError(
            'Error occurred when attempting to get current progress',
            error,
        );
        return null;
    }
}

export async function isPlayerEligibleForScore(
    gameSessionId: number,
    levelCount: number,
) {
    try {
        const finishedCount = await prisma.gameProgress.count({
            where: {
                gameSessionId,
                finishedAt: {
                    not: null,
                },
            },
        });

        return finishedCount === levelCount;
    } catch (error) {
        logError(
            'Error occurred when attempting to get current progress',
            error,
        );
        return false;
    }
}

// Checks if:
// 1) No level is in progress (a record exists but finishedAt is NULL)
// 2) Levels completed < level count
// Returns true if both are true
export async function canStartNewLevel(
    gameSessionId: number,
    levelCount: number,
) {
    try {
        const [finishedCount, inProgress] = await Promise.all([
            prisma.gameProgress.count({
                where: {
                    gameSessionId,
                    finishedAt: {
                        not: null,
                    },
                },
            }),
            prisma.gameProgress.findFirst({
                where: {
                    gameSessionId,
                    finishedAt: null,
                },
            }),
        ]);

        return inProgress === null && finishedCount < levelCount;
    } catch (error) {
        logError(
            'Error occurred when attempting to get current progress',
            error,
        );
        return false;
    }
}

export async function startLevel(levelId: number, gameSessionId: number) {
    try {
        await prisma.gameProgress.create({
            data: {
                gameSessionId,
                levelId,
            },
        });

        return true;
    } catch (error) {
        logError('Error occurred when attempting to start a new level', error);
        return false;
    }
}

export async function completeLevel(gameSessionId: number, levelId: number) {
    try {
        await prisma.gameProgress.update({
            where: {
                unique_individual_level_progress_per_session: {
                    gameSessionId,
                    levelId,
                },
            },
            data: {
                finishedAt: new Date(),
            },
        });

        return true;
    } catch (error) {
        logError('Error occurred when attempting to update progress', error);
        return false;
    }
}
