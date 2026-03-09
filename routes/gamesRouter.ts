import { Router } from 'express';

import validateSessionMiddleware from '../controllers/utilities/validateSessionMiddleware';

import {
    controllerGetSession,
    controllerGetCurrentLevel,
} from '../controllers/game/gameControllersGet';
import {
    controllerPostGame,
    controllerPostAnswer,
    controllerPostNewLevel,
} from '../controllers/game/gameControllersPost';
import { controllerDeleteSession } from '../controllers/game/gameControllerDelete';

// eslint-disable-next-line new-cap
const gamesRouter = Router();

// Start session
gamesRouter.post('/sessions', controllerPostGame);

// Delete session
gamesRouter.delete(
    '/sessions/current',
    validateSessionMiddleware,
    controllerDeleteSession,
);

// Check session
gamesRouter.get(
    '/sessions/current',
    validateSessionMiddleware,
    controllerGetSession,
);

// Get current level
gamesRouter.get(
    '/sessions/current/levels',
    validateSessionMiddleware,
    controllerGetCurrentLevel,
);

// Submit level answers
gamesRouter.post(
    '/sessions/current/answer',
    validateSessionMiddleware,
    controllerPostAnswer,
);

// Start a new level
gamesRouter.post(
    '/sessions/current/levels',
    validateSessionMiddleware,
    controllerPostNewLevel,
);

export default gamesRouter;
