import express from 'express';
import request from 'supertest';
import gamesRouter from '../routes/gamesRouter';
import { test, expect, afterAll, beforeAll } from '@jest/globals';

import createPlayer from './scripts/utilities/createPlayer';
import sendAnswer from './scripts/utilities/sendAnswer';
import getProgressData from './scripts/utilities/getProgressData';
import startNextLevel from './scripts/utilities/startNextLevel';

import seedAll from './scripts/seeds/seedAll';
import truncateAllTables from './scripts/utilities/truncateAll';
import { prisma } from '../lib/prisma';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/games', gamesRouter);

beforeAll(async () => {
    console.log('###################### SEED START ######################\n');
    await seedAll();
    console.log('###################### SEED END ######################\n');
});

test('Able to play the full game', async () => {
    const token = await createPlayer(request, app, '320');

    // Answer correctly
    const level1 = await sendAnswer(request, app, token, [
        {
            characterId: 1,
            pctX: 0.434,
            pctY: 0.329,
        },
        {
            characterId: 2,
            pctX: 0.7061,
            pctY: 0.771,
        },
    ]);

    expect(level1.status).toBe(200);
    expect(level1.body).toEqual({ success: true });

    // Level end progress
    const level1EndProgress = await getProgressData(request, app, token);

    expect(level1EndProgress.status).toBe(200);
    expect(level1EndProgress.body).toEqual({
        success: true,
        progress: { completed: 1, total: 3, current: null },
    });

    // Start next level
    const startLevel2 = await startNextLevel(request, app, token);

    expect(startLevel2.status).toBe(200);
    expect(startLevel2.body).toEqual({ success: true });

    // During level progress
    const level2Progress = await getProgressData(request, app, token);

    expect(level2Progress.status).toBe(200);
    expect(level2Progress.body).toMatchObject({
        success: true,
        progress: { completed: 1, total: 3, current: { levelId: 2 } },
    });

    const level2 = await sendAnswer(request, app, token, [
        {
            characterId: 3,
            pctX: 0.5961,
            pctY: 0.3971,
        },
        {
            characterId: 4,
            pctX: 0.8181,
            pctY: 0.6291,
        },
    ]);

    expect(level2.status).toBe(200);
    expect(level2.body).toEqual({ success: true });

    // Cannot answer before starting the next level
    const level3Error = await sendAnswer(request, app, token, [
        {
            characterId: 5,
            pctX: 0.5321,
            pctY: 0.1721,
        },
        {
            characterId: 6,
            pctX: 0.3171,
            pctY: 0.8011,
        },
    ]);

    expect(level3Error.status).toBe(500);
    expect(level3Error.body).toEqual({
        success: false,
        message: 'Internal server error!',
    });

    const startLevel3 = await startNextLevel(request, app, token);
    expect(startLevel3.status).toBe(200);

    const level3 = await sendAnswer(request, app, token, [
        {
            characterId: 5,
            pctX: 0.5321,
            pctY: 0.1721,
        },
        {
            characterId: 6,
            pctX: 0.3171,
            pctY: 0.8011,
        },
    ]);

    expect(level3.status).toBe(200);
    expect(level3.body).toEqual({ success: true });

    const level3EndProgress = await getProgressData(request, app, token);

    expect(level3EndProgress.status).toBe(200);
    expect(level3EndProgress.body).toMatchObject({
        success: true,
        finished: true,
        placement: 1,
        score: expect.any(Number),
    });

    // Cannot start a new level after the game has ended
    const startAfterEnd = await startNextLevel(request, app, token);

    expect(startAfterEnd.status).toBe(403);
    expect(startAfterEnd.body).toEqual({
        success: false,
        eligibleForScore: true,
    });

    // Cannot send an answer after the game has ended
    const answerAfterEnd = await sendAnswer(request, app, token, [
        {
            characterId: 5,
            pctX: 0.5321,
            pctY: 0.1721,
        },
        {
            characterId: 6,
            pctX: 0.3171,
            pctY: 0.8011,
        },
    ]);

    expect(answerAfterEnd.status).toBe(500);
    expect(answerAfterEnd.body).toEqual({
        success: false,
        message: 'Internal server error!',
    });

    const placements = await request(app).get('/games/scores');

    expect(placements.status).toBe(200);
    expect(placements.body).toMatchObject({
        success: true,
        placements: [
            {
                playerId: 1,
                name: 'test',
                score: expect.any(Number),
                completedLevels: 3,
                placement: 1,
            },
        ],
    });
});

afterAll(async () => {
    console.log(
        '###################### TRUNCATE START ######################\n',
    );
    await truncateAllTables();
    await prisma.$disconnect();
    console.log('###################### TRUNCATE END ######################\n');
});
