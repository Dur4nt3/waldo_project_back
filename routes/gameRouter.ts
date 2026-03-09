import { Router } from 'express';

import { controllerPostGame } from '../controllers/game/gameControllersPost';

// eslint-disable-next-line new-cap
const gameRouter = Router();

// Start Game
gameRouter.post('/', controllerPostGame);

// Get Level
// gameRouter.get('/');

// Submit Level
// gameRouter.post('/answer');

export default gameRouter;
