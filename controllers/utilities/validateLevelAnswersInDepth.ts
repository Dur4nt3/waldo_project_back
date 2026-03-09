import { getOrderIndexByLevelId } from '../../db/queries/levelQueries';
import { didUserAlreadyCompleteLevel } from '../../db/queries/progressQueries';
import {
    getCharacterCountInLevel,
    isCharacterInLevel,
} from '../../db/queries/characterQueries';

export default async function validateLevelAnswersInDepth(
    session: any,
    levelId: number,
    locations: any,
) {
    const levelOrderIndex = await getOrderIndexByLevelId(levelId);

    if (levelOrderIndex === null || levelOrderIndex > session.levelCount) {
        return { status: 500, message: 'Internal server error!' };
    }

    const levelIsCompleted = await didUserAlreadyCompleteLevel(
        levelId,
        session.gameSessionId,
    );

    if (levelIsCompleted !== false) {
        if (levelIsCompleted === null) {
            return { status: 500, message: 'Internal server error!' };
        }
        return { status: 403, message: 'This action is forbidden!' };
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

1) Check that the levelId exists, has a valid index, and the index isn't bigger than the player's level count
2) Check that the player didn't already complete this level
3) Check that all characterIds exist, and are characters actually present in the current level
4) Check that the amount of character locations submitted matches the amount of characters in a level

Note: 4 is mostly for if the amount of characters is lower than what there are in the level.
3 already checks for if the amount of characters is bigger than what there are in the level.
*/
