import type { Response } from 'express';

import { isCharacterLocationValid } from '../../db/queries/gameQueries';

export default async function validateLevelAnswersCoordinates(
    breakpointId: number,
    locations: any,
) {
    const coordinateCheck = locations.map((location: any) =>
        isCharacterLocationValid(
            location.characterId,
            breakpointId,
            location.pctX,
            location.pctY,
        ),
    );

    const checkResults = await Promise.all(coordinateCheck);

    const invalidIds: number[] = [];

    checkResults.forEach((result, index) => {
        if (!result) {
            invalidIds.push(locations[index].characterId);
        }
    });

    if (invalidIds.length === 0) {
        return true;
    }

    return invalidIds;
}
