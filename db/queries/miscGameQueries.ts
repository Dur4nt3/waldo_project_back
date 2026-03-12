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
