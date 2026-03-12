import type { Request, Response } from 'express';

import { matchedData, validationResult } from 'express-validator';

import validateName from '../utilities/validateName';
import validateScreenWidth from '../utilities/validateScreenWidth';
import validateLevelAnswersInitial from '../utilities/validateLevelAnswersInitial';

import validateLevelAnswersInDepth from '../utilities/validateLevelAnswersInDepth';
import validateLevelAnswersCoordinates from '../utilities/validateLevelAnswersCoordinates';

import { generateSessionToken } from '../utilities/sessionTokenUtilities';
import getPlayerCurrentLevel from '../utilities/getPlayerCurrentLevel';

import { insertPlayer, getBreakpoint } from '../../db/queries/miscGameQueries';
import {
    getLevelCount,
    getLevelByOrderIndex,
} from '../../db/queries/levelQueries';
import {
    getCurrentProgress,
    startLevel,
    completeLevel,
} from '../../db/queries/progressQueries';
import { insertGameSession } from '../../db/queries/sessionManagementQueries';

import {
    error500,
    error401,
    errorCustom,
    error403,
} from '../utilities/serverResponses';

export async function controllerPostNewLevel(req: Request, res: Response) {
    const session = req.gameSession;

    if (!session) {
        return error401(res);
    }

    const currentProgress = await getCurrentProgress(session.sessionToken);

    if (currentProgress === null) {
        return error500(res);
    }

    let completedLevels = 0;
    let currentLevel = null;

    for (const levelProgress of currentProgress.playerProgress) {
        const { startedAt, finishedAt, level } = levelProgress;

        if (startedAt !== null && finishedAt !== null) {
            completedLevels += 1;
        }

        if (startedAt !== null && finishedAt === null) {
            currentLevel = level.orderIndex;
        }
    }

    if (currentLevel !== null || completedLevels === session.levelCount) {
        if (completedLevels === session.levelCount) {
            return res.status(403).json({
                success: false,
                eligibleForScore: true,
            });
        }

        return error403(res);
    }

    const nextLevelOrderIndex = completedLevels + 1;

    const nextLevel = await getLevelByOrderIndex(nextLevelOrderIndex);

    if (!nextLevel) {
        return error500(res);
    }

    const startSuccessful = await startLevel(
        nextLevel.levelId,
        session.gameSessionId,
    );

    if (!startSuccessful) {
        return error500(res);
    }

    const currentLevelData = await getPlayerCurrentLevel(currentProgress);

    return res.json({
        success: true,
        progress: currentLevelData,
    });
}

const controllerPostGame: any[] = [
    [...validateName, ...validateScreenWidth],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { name, screenWidth } = matchedData(req);

        const [gameBreakpoint, gameLevels] = await Promise.all([
            getBreakpoint(screenWidth),
            getLevelCount(),
        ]);

        if (
            gameBreakpoint === null ||
            gameLevels === null ||
            gameLevels === 0
        ) {
            return error500(res);
        }

        const player = await insertPlayer(name);

        if (!player) {
            return error500(res);
        }

        const { token, hash } = generateSessionToken();

        const session = await insertGameSession(
            hash,
            gameLevels,
            player.playerId,
            gameBreakpoint.breakpointId,
        );

        if (!session) {
            return error500(res);
        }

        return res.json({
            success: true,
            token,
        });
    },
];

const controllerPostAnswer: any[] = [
    validateLevelAnswersInitial,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const session = req.gameSession;

        if (session === null || session === undefined) {
            return error401(res);
        }

        const { levelId, locationsString } = matchedData(req);

        const locations = JSON.parse(locationsString);

        const inDepthCheck = await validateLevelAnswersInDepth(
            res,
            session,
            levelId,
            locations,
        );

        if (inDepthCheck !== true) {
            return errorCustom(res, inDepthCheck.status, inDepthCheck.message);
        }

        const coordinateCheck = await validateLevelAnswersCoordinates(
            session.breakpointId,
            locations,
        );

        if (coordinateCheck !== true) {
            return res.status(400).json({
                success: false,
                invalidIds: coordinateCheck,
            });
        }

        const completionSuccessful = await completeLevel(
            session.gameSessionId,
            levelId,
        );

        if (!completionSuccessful) {
            return error500(res);
        }

        return res.json({
            success: true,
        });
    },
];

export { controllerPostGame, controllerPostAnswer };
