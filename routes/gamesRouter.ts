import { Router } from 'express';

import { controllerGetSession, controllerGetCurrentLevel } from '../controllers/game/gameControllersGet';
import { controllerPostGame } from '../controllers/game/gameControllersPost';

// eslint-disable-next-line new-cap
const gamesRouter = Router();

// Start session
gamesRouter.post('/sessions', controllerPostGame);

// Check session
gamesRouter.get('/sessions/current', controllerGetSession);

// Get current level
gamesRouter.get('/sessions/current/progress', controllerGetCurrentLevel);

// Submit level
// gamesRouter.post('/sessions/current/answer');

// Delete session
// gamesRouter.delete('/sessions/current')

export default gamesRouter;
