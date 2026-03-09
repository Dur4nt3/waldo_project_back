import type { Request, Response } from 'express';

import { error401, error500 } from '../utilities/serverResponses';

import { getCurrentProgress } from '../../db/queries/progressQueries';

import getPlayerCurrentLevel from '../utilities/getPlayerProgressData';
import getScore from '../utilities/getScore';
import { getLeaderboardPlacement } from '../../db/queries/miscGameQueries';

export function controllerGetSession(req: Request, res: Response) {
    const session = req.gameSession;

    if (session === null || session === undefined) {
        return error401(res);
    }

    return res.json({
        success: true,
        session,
    });
}

export async function controllerGetCurrentLevel(req: Request, res: Response) {
    const session = req.gameSession;

    if (session === null || session === undefined) {
        return error401(res);
    }

    // Player has finished the game
    if (session.player.score !== null) {
        const placement = await getLeaderboardPlacement(session.player.score);

        return res.json({
            success: true,
            finished: true,
            score: session.player.score,
            placement,
        });
    }

    const currentProgress = await getCurrentProgress(session.sessionToken);

    if (currentProgress === null) {
        // We already validated the session above
        // If we get null this is a server error
        return error500(res);
    }

    const currentLevel = await getPlayerCurrentLevel(currentProgress);

    return res.json({
        success: true,
        progress: currentLevel,
    });
}
