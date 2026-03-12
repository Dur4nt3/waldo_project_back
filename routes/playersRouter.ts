import { Router } from 'express';

// eslint-disable-next-line new-cap
const playersRouter = Router();

// Create score
playersRouter.post('/scores', (req, res) => res.json({ msg: 'WIP' }));

export default playersRouter;
