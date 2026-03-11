import { prisma } from '../../lib/prisma';

import { includeMiscSessionData } from '../utilities/includeConfig';

import type GameSessionWithMiscData from '../../types/GameSessionWithMiscData';

import logError from '../utilities/logError';

// ------------ SELECT QUERIES ------------

export async function getGameSession(
    sessionHash: string,
): Promise<GameSessionWithMiscData | null> {
    try {
        const session = await prisma.gameSession.findUnique({
            where: {
                sessionToken: sessionHash,
            },
            include: includeMiscSessionData,
        });

        return session;
    } catch (error) {
        logError('Error occurred when attempting to find session', error);
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
        logError('Error occurred when attempting to insert session', error);
        return null;
    }
}

// ------------ INSERT QUERIES ------------
