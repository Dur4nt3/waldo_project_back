import { prisma } from '../../lib/prisma';

import logError from '../utilities/logError';

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
