import { prisma } from '../../lib/prisma';

import logError from '../utilities/logError';

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
        logError('Error occurred when attempting to find breakpoint', error);
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

export async function getCharacterCountInLevel(levelId: number) {
    try {
        const image = await prisma.level.findUnique({
            where: {
                levelId,
            },
            select: {
                imageId: true,
            },
        });

        if (image === null) {
            return null;
        }

        const { imageId } = image;

        const characters = await prisma.character.findMany({
            where: {
                imageId,
            },
        });

        return characters.length === 0 ? null : characters.length;
    } catch (error) {
        logError('Error occurred when attempting to check characters', error);
        return null;
    }
}

// ------------ SELECT QUERIES ------------

// ------------ SELECT QUERIES (VALIDATION) ------------

export async function isCharacterInLevel(characterId: number, levelId: number) {
    try {
        const image = await prisma.level.findUnique({
            where: {
                levelId,
            },
            select: {
                imageId: true,
            },
        });

        if (image === null) {
            return false;
        }

        const { imageId } = image;

        const character = await prisma.character.findUnique({
            where: {
                characterId,
                imageId,
            },
        });

        return character !== null;
    } catch (error) {
        logError('Error occurred when attempting to check character', error);
        return false;
    }
}

export async function isCharacterLocationValid(
    characterId: number,
    breakpointId: number,
    pctX: number,
    pctY: number,
) {
    try {
        const location = await prisma.characterLocation.findUnique({
            where: {
                unique_individual_character_location_per_breakpoint: {
                    breakpointId,
                    characterId,
                },
            },
        });

        if (location === null) {
            return false;
        }

        return (
            location.xMin <= pctX &&
            location.xMax >= pctX &&
            location.yMin <= pctY &&
            location.yMax >= pctY
        );
    } catch (error) {
        logError(
            'Error occurred when attempting to check character location',
            error,
        );
        return false;
    }
}

// ------------ SELECT QUERIES (VALIDATION) ------------

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
        logError('Error occurred when attempting to insert player', error);
        return null;
    }
}

// ------------ INSERT QUERIES ------------

// ------------ UPDATE QUERIES ------------

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

// ------------ UPDATE QUERIES ------------
