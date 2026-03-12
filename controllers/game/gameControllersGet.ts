import type { Request, Response } from 'express';

import { error401, error403, error500 } from '../utilities/serverResponses';

import { getCurrentProgress } from '../../db/queries/progressQueries';

import getPlayerCurrentLevel from '../utilities/getPlayerCurrentLevel';

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
        return error403(res);
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
