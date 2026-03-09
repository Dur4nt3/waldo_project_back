import type { Request, Response } from 'express';

import { deleteGameSession } from '../../db/queries/sessionManagementQueries';

import { error500, error401 } from '../utilities/serverResponses';

export async function controllerDeleteSession(req: Request, res: Response) {
    const session = req.gameSession;

    if (!session) {
        return error401(res);
    }

    const deletionSuccess = await deleteGameSession(session.sessionToken);

    if (!deletionSuccess) {
        return error500(res);
    }

    return res.json({
        success: true,
    });
}
