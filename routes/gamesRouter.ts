import { Router } from 'express';

import validateSessionMiddleware from '../controllers/utilities/validateSessionMiddleware';

import {
    controllerGetSession,
    controllerGetCurrentLevel,
} from '../controllers/game/gameControllersGet';
import {
    controllerPostGame,
    controllerPostAnswer,
} from '../controllers/game/gameControllersPost';

// eslint-disable-next-line new-cap
const gamesRouter = Router();

// Start session
gamesRouter.post('/sessions', controllerPostGame);

// Check session
gamesRouter.get(
    '/sessions/current',
    validateSessionMiddleware,
    controllerGetSession,
);

// Get current level
gamesRouter.get('/sessions/current/levels', controllerGetCurrentLevel);

// Start a new level
// gamesRouter.post('/sessions/current/levels', validateSessionMiddleware)

// Submit level answers
gamesRouter.post(
    '/sessions/current/answer',
    validateSessionMiddleware,
    controllerPostAnswer,
);

// Delete session
// gamesRouter.delete('/sessions/current',)

export default gamesRouter;
