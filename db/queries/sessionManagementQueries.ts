import { prisma } from '../../lib/prisma';

import { includeMiscSessionData } from '../utilities/includeConfig';

import type GameSessionWithMiscData from '../../types/GameSessionWithMiscData';

import logError from '../utilities/logError';

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

export async function deleteGameSession(sessionHash: string) {
    try {
        await prisma.gameSession.delete({
            where: {
                sessionToken: sessionHash,
            },
        });

        return true;
    } catch (error) {
        logError('Error occurred when attempting to delete session', error);
        return false;
    }
}
