import type { Response } from 'express';

import {
    getOrderIndexByLevelId,
    getCharacterCountInLevel,
    isCharacterInLevel,
} from '../../db/queries/gameQueries';

export default async function validateLevelAnswersInDepth(
    res: Response,
    session: any,
    levelId: number,
    locations: any,
) {
    const levelOrderIndex = await getOrderIndexByLevelId(levelId);

    if (levelOrderIndex === null || levelOrderIndex > session.levelCount) {
        return { status: 500, message: 'Internal server error!' };
    }

    const characterIdCheck = locations.map((location: any) =>
        isCharacterInLevel(location.characterId, levelId),
    );

    const checkResults = await Promise.all(characterIdCheck);

    const allCharactersValid = checkResults.some(
        (inLevel: boolean) => !inLevel,
    );

    if (allCharactersValid) {
        return { status: 400, message: 'Invalid character IDs!' };
    }

    const characterCount = await getCharacterCountInLevel(levelId);

    if (characterCount !== locations.length) {
        return {
            status: 400,
            message: 'Character count does not match the current level!',
        };
    }

    return true;
}

/*

What this function aims to achieve:

1) Check that the levelId exists, has a valid index (in-general and in the context of the player)
2) Check that all characterIds exist, and are characters actually present in the current level
3) Check that the amount of character locations submitted matches the amount of characters in a level

*/
