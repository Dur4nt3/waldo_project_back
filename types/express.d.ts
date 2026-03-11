import GameSessionWithMiscData from './GameSessionWithMiscData';

declare module 'express-serve-static-core' {
    interface Request {
        gameSession?: GameSessionWithMiscData;
    }
}

export {};