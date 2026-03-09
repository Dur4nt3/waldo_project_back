import type { Request, Response } from 'express';

import { matchedData, validationResult } from 'express-validator';

import validateName from '../utilities/validateName';
import validateScreenWidth from '../utilities/validateScreenWidth';
import validateLevelAnswersInitial from '../utilities/validateLevelAnswersInitial';

import validateLevelAnswersInDepth from '../utilities/validateLevelAnswersInDepth';
import validateLevelAnswersCoordinates from '../utilities/validateLevelAnswersCoordinates';

import getScore from '../utilities/getScore';
import getCompletedAndCurrentLevel from '../utilities/getCompletedAndCurrentLevel';

import { generateSessionToken } from '../utilities/sessionTokenUtilities';

import {
    insertPlayer,
    getBreakpoint,
    assignScore,
} from '../../db/queries/miscGameQueries';
import {
    getLevelCount,
    getLevelByOrderIndex,
} from '../../db/queries/levelQueries';
import {
    getCurrentProgress,
    getPlayerCurrentLevel,
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

    const { completed, currentLevel } =
        getCompletedAndCurrentLevel(currentProgress);

    if (currentLevel !== null || completed === session.levelCount) {
        if (completed === session.levelCount) {
            return res.status(403).json({
                success: false,
                eligibleForScore: true,
            });
        }

        return error403(res);
    }

    const nextLevelOrderIndex = completed + 1;

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

    return res.json({
        success: true,
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
            getBreakpoint(Number(screenWidth)),
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

        const startSuccessful = await startLevel(1, session.gameSessionId);

        if (!startSuccessful) {
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

        const { locations } = matchedData(req);

        const currentLevel = await getPlayerCurrentLevel(session.gameSessionId);

        if (currentLevel === null) {
            return error500(res);
        }

        const { levelId } = currentLevel.level;

        const inDepthCheck = await validateLevelAnswersInDepth(
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

        const currentProgress = await getCurrentProgress(session.sessionToken);

        if (currentProgress === null) {
            return error500(res);
        }

        const { completed } = getCompletedAndCurrentLevel(currentProgress);

        if (completed !== session.levelCount) {
            return res.json({
                success: true,
            });
        }

        const finishTime = getScore(currentProgress.playerProgress);

        const scoreAssigned = await assignScore(
            session.player.playerId,
            finishTime,
            session.levelCount,
        );

        if (!scoreAssigned) {
            return error500(res);
        }

        return res.json({
            success: true,
        });
    },
];

export { controllerPostGame, controllerPostAnswer };
