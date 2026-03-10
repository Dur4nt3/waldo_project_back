import { Router } from 'express';

import { controllerGetSession } from '../controllers/game/gameControllersGet';
import { controllerPostGame } from '../controllers/game/gameControllersPost';

// eslint-disable-next-line new-cap
const gameRouter = Router();

// Start session
gameRouter.post('/', controllerPostGame);

// Check session
gameRouter.get('/session', controllerGetSession);

// Get current level
// gameRouter.get('/');

// Submit level
// gameRouter.post('/answers');

// Delete session
// gameRouter.delete('/sessions')

export default gameRouter;
