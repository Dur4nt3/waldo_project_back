import type { Request, Response } from 'express';

import { error401 } from '../utilities/serverResponses';

import { checkTokenValidity } from '../utilities/sessionTokenUtilities';

import { getGameSession } from '../../db/queries/sessionManagementQueries';

export async function controllerGetSession(req: Request, res: Response) {
    const tokenValidity = checkTokenValidity(req);

    if (tokenValidity === false) {
        return error401(res);
    }

    const session = await getGameSession(tokenValidity);

    if (session === null) {
        return error401(res);
    }

    return res.json({
        success: true,
    });
}
