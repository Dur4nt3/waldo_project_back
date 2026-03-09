import type { Request, Response } from 'express';

import { matchedData, validationResult } from 'express-validator';

import validateName from '../utilities/validateName';
import validateScreenWidth from '../utilities/validateScreenWidth';

import generateSessionToken from '../utilities/generateSessionToken';

import {
    insertPlayer,
    getBreakpoint,
    getLevelCount,
    insertGameSession,
} from '../../db/queries/gameQueries';

import { error500 } from '../utilities/serverResponses';

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

export { controllerPostGame };
