import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import gameRouter from './routes/gameRouter';

const app = express();

app.use(cookieParser());

if (process.env.GAME_CLIENT === undefined) {
    throw new Error('Game client is not set!');
}

app.use(
    cors({
        origin: [process.env.GAME_CLIENT],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/games', gameRouter);

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: `An unexpected error occurred: ${err}`,
    });
});

const appPort = process.env.PORT || 8080;

app.listen(appPort, (error) => {
    if (error) {
        throw error;
    }
    console.log('App running and listening on port: ', appPort);
});
