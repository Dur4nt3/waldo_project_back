import express from 'express';
import request from 'supertest';
import gamesRouter from '../routes/gamesRouter';
import { test, expect, afterAll, beforeAll } from '@jest/globals';

import { hashSessionToken } from '../controllers/utilities/sessionTokenUtilities';
import createPlayer from './scripts/utilities/createPlayer';

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

test('Not able to delete a session without a token', async () => {
    const response = await request(app).delete('/games/sessions/current');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
        success: false,
        message: 'Could not validate session!',
    });
});

test('Able to delete a session', async () => {
    const token = await createPlayer(request, app, '320');

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

    const deleteSession = await request(app)
        .delete('/games/sessions/current')
        .set('Session-Token', token);

    expect(deleteSession.status).toBe(200);

    const postDeletion = await request(app)
        .get('/games/sessions/current')
        .set('Session-Token', token);

    expect(postDeletion.status).toBe(401);
});

afterAll(async () => {
    console.log(
        '###################### TRUNCATE START ######################\n',
    );
    await truncateAllTables();
    await prisma.$disconnect();
    console.log('###################### TRUNCATE END ######################\n');
});
