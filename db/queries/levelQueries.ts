import { prisma } from '../../lib/prisma';

import logError from '../utilities/logError';

export async function getLevelByOrderIndex(orderIndex: number) {
    try {
        const level = await prisma.level.findUnique({
            where: {
                orderIndex,
            },
        });

        return level;
    } catch (error) {
        logError('Error occurred when attempting to get level', error);
        return null;
    }
}

export async function getOrderIndexByLevelId(levelId: number) {
    try {
        const level = await prisma.level.findUnique({
            where: {
                levelId,
            },
        });

        if (level === null) {
            return null;
        }

        return level.orderIndex;
    } catch (error) {
        logError('Error occurred when attempting to check level', error);
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
        logError('Error occurred when attempting to get level count', error);
        return null;
    }
}

// Returns the levelId, imageId, marker width, marker height and character data
// For a specific orderIndex and breakpointId
export async function getAllLevelData(
    orderIndex: number,
    breakpointId: number,
) {
    try {
        const levelImage = await prisma.level.findUnique({
            where: {
                orderIndex,
            },
            select: {
                levelId: true,
                imageId: true,
            },
        });

        if (levelImage === null) {
            return null;
        }

        const { imageId, levelId } = levelImage;

        const [markerSize, characters] = await Promise.all([
            prisma.marker.findUnique({
                where: {
                    unique_marker_per_level_and_breakpoint: {
                        breakpointId,
                        levelId,
                    },
                },
                select: {
                    width: true,
                    height: true,
                },
            }),
            prisma.character.findMany({
                where: {
                    imageId,
                },
            }),
        ]);

        if (markerSize === null || characters.length === 0) {
            return null;
        }

        return { levelId, imageId, markerSize, characters };
    } catch (error) {
        logError('Error occurred when attempting to get level data', error);
        return null;
    }
}
