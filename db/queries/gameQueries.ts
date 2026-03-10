import { prisma } from '../../lib/prisma';

import type GameSessionWithProgress from '../../types/GameSessionWithProgress';
import { includeProgressData } from '../utilities/includeConfig';

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
        console.error('------------------Logged Error------------------\n');
        console.error(
            'Error occurred when attempting to get current progress\n',
        );
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

// ------------ INSERT QUERIES ------------
