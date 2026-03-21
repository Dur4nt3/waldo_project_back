import express from 'express';
import request from 'supertest';
import gamesRouter from '../routes/gamesRouter';
import { test, expect, afterAll, beforeAll } from '@jest/globals';

import { hashSessionToken } from '../controllers/utilities/sessionTokenUtilities';

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

test('Not able to fetch a session when a token is not provided', async () => {
    const response = await request(app).get('/games/sessions/current');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
        success: false,
        message: 'Could not validate session!',
    });
});

test('Able to validate invalid name and screen width when requesting a new session', async () => {
    const response1 = await request(app).post('/games/sessions');

    expect(response1.status).toBe(400);

    expect(response1.body).toEqual({
        success: false,
        errors: [
            {
                type: 'field',
                value: '',
                msg: 'Name must not be empty',
                path: 'name',
                location: 'body',
            },
            {
                type: 'field',
                value: '',
                msg: 'Screen width cannot be empty',
                path: 'screenWidth',
                location: 'body',
            },
        ],
    });

    const response2 = await request(app).post('/games/sessions').send({
        name: '1',
        screenWidth: '0',
    });

    expect(response2.status).toBe(400);

    expect(response2.body).toEqual({
        success: false,
        errors: [
            {
                type: 'field',
                value: '1',
                msg: 'Name must be between 3 and 30 characters',
                path: 'name',
                location: 'body',
            },
            {
                type: 'field',
                value: '0',
                msg: 'Screen width must be between 1 and 999999',
                path: 'screenWidth',
                location: 'body',
            },
        ],
    });

    const response3 = await request(app).post('/games/sessions').send({
        name: '---',
        screenWidth: '1000000',
    });

    expect(response3.status).toBe(400);

    expect(response3.body).toEqual({
        success: false,
        errors: [
            {
                type: 'field',
                value: '---',
                msg: 'Name must only contain letters and numbers',
                path: 'name',
                location: 'body',
            },
            {
                type: 'field',
                value: '1000000',
                msg: 'Screen width must be between 1 and 999999',
                path: 'screenWidth',
                location: 'body',
            },
        ],
    });
});

test('Able to create a session', async () => {
    const response = await request(app).post('/games/sessions').send({
        name: 'test',
        screenWidth: '320',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();

    const { token } = response.body;

    const checkSession = await request(app)
        .get('/games/sessions/current')
        .set('Session-Token', token);

    expect(checkSession.status).toBe(200);

    expect(checkSession.body).toMatchObject({
        success: true,
        session: {
            gameSessionId: 1,
            sessionToken: hashSessionToken(token),
            // In the future if you change the default amount of levels
            // either adjust this property or remove it
            levelCount: 3,
            playerId: 1,
            breakpointId: 1,
            player: {
                playerId: 1,
                name: 'test',
                score: null,
                completedLevels: null,
            },
            breakpoint: {
                breakpointId: 1,
                minimumWidthPx: 0,
                maximumWidthPx: 639,
            },
        },
    });

    const checkLevel = await request(app)
        .get('/games/sessions/current/levels')
        .set('Session-Token', token);

    expect(checkLevel.status).toBe(200);

    expect(checkLevel.body).toMatchObject({
        success: true,
        progress: {
            completed: 0,
            total: 3,
            current: {
                levelId: 1,
                imageId: 1,
            },
        },
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
