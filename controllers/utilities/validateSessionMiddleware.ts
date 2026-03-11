import type { Request, Response, NextFunction } from 'express';

import { checkTokenValidity } from './sessionTokenUtilities';

import { error401 } from './serverResponses';

import { getGameSession } from '../../db/queries/sessionManagementQueries';

export default async function validateSessionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const tokenValidity = checkTokenValidity(req);

    if (tokenValidity === false) {
        return error401(res);
    }

    const session = await getGameSession(tokenValidity);

    if (session === null) {
        return error401(res);
    }

    req.gameSession = session;
    next();
}
