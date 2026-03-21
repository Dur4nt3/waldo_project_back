import express from 'express';
import request from 'supertest';
import gamesRouter from '../routes/gamesRouter';
import { test, expect, afterAll, beforeAll } from '@jest/globals';

import createPlayer from './scripts/utilities/createPlayer';
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

test('Not able to start the next level without a session', async () => {
    const nextLevel = await startNextLevel(request, app, 'noToken');
    expect(nextLevel.status).toBe(401);
});

test('Not able to start the next level without completing the current one', async () => {
    const token = await createPlayer(request, app, '320');

    const nextLevel = await startNextLevel(request, app, token);

    expect(nextLevel.status).toBe(403);
    expect(nextLevel.body).toEqual({
        success: false,
        message: 'You are not allowed to perform this action',
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
