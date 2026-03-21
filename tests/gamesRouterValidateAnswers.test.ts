import express from 'express';
import request from 'supertest';
import gamesRouter from '../routes/gamesRouter';
import { test, expect, afterAll, beforeAll } from '@jest/globals';

import createPlayer from './scripts/utilities/createPlayer';
import sendAnswer from './scripts/utilities/sendAnswer';

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

test('Not able to submit an answer without a session', async () => {
    const noToken = await request(app).post('/games/sessions/current/answer');

    expect(noToken.status).toBe(401);

    const fakeToken = await request(app)
        .post('/games/sessions/current/answer')
        .set('Session-Token', 'notARealToken');

    expect(fakeToken.status).toBe(401);
});

test('Able to perform an initial validation on answers', async () => {
    const token = await createPlayer(request, app, '320');

    const validate1 = await sendAnswer(request, app, token, '');

    expect(validate1.status).toBe(400);
    expect(validate1.body).toEqual({
        success: false,
        errors: [
            {
                type: 'field',
                value: '',
                msg: 'Invalid answer format!',
                path: 'locations',
                location: 'body',
            },
        ],
    });

    const validate2 = await sendAnswer(request, app, token, [{}, {}]);

    expect(validate2.status).toBe(400);
    expect(validate2.body).toEqual({
        success: false,
        errors: [
            {
                type: 'field',
                msg: 'Answers must include the character ID!',
                path: 'locations[0].characterId',
                location: 'body',
            },
            {
                type: 'field',
                msg: 'Answers must include the character ID!',
                path: 'locations[1].characterId',
                location: 'body',
            },
            {
                type: 'field',
                msg: 'Answers must include the x coordinate!',
                path: 'locations[0].pctX',
                location: 'body',
            },
            {
                type: 'field',
                msg: 'Answers must include the x coordinate!',
                path: 'locations[1].pctX',
                location: 'body',
            },
            {
                type: 'field',
                msg: 'Answers must include the y coordinate',
                path: 'locations[0].pctY',
                location: 'body',
            },
            {
                type: 'field',
                msg: 'Answers must include the y coordinate',
                path: 'locations[1].pctY',
                location: 'body',
            },
        ],
    });

    const validate3 = await sendAnswer(request, app, token, [
        {
            characterId: 'test',
            pctX: 'test',
            pctY: 'test',
        },
        {
            characterId: 'test',
            pctX: 'test',
            pctY: 'test',
        },
    ]);

    expect(validate3.status).toBe(400);
    expect(validate3.body).toEqual({
        success: false,
        errors: [
            {
                type: 'field',
                value: 'test',
                msg: 'Invalid id format!',
                path: 'locations[0].characterId',
                location: 'body',
            },
            {
                type: 'field',
                value: 'test',
                msg: 'Invalid id format!',
                path: 'locations[1].characterId',
                location: 'body',
            },
            {
                type: 'field',
                value: 'test',
                msg: 'Invalid x coordinate!',
                path: 'locations[0].pctX',
                location: 'body',
            },
            {
                type: 'field',
                value: 'test',
                msg: 'Invalid x coordinate!',
                path: 'locations[1].pctX',
                location: 'body',
            },
            {
                type: 'field',
                value: 'test',
                msg: 'Invalid y coordinate',
                path: 'locations[0].pctY',
                location: 'body',
            },
            {
                type: 'field',
                value: 'test',
                msg: 'Invalid y coordinate',
                path: 'locations[1].pctY',
                location: 'body',
            },
        ],
    });
});

test('Able to perform an in-depth validation', async () => {
    const token = await createPlayer(request, app, '320');

    const validate1 = await sendAnswer(request, app, token, [
        {
            characterId: 3,
            pctX: 0.5,
            pctY: 0.5,
        },
        {
            characterId: 4,
            pctX: 0.5,
            pctY: 0.5,
        },
    ]);

    expect(validate1.status).toBe(400);
    expect(validate1.body).toEqual({
        success: false,
        message: 'Invalid character IDs!',
    });

    const validate2 = await sendAnswer(request, app, token, [
        {
            characterId: 1,
            pctX: 0.5,
            pctY: 0.5,
        },
    ]);

    expect(validate2.status).toBe(400);
    expect(validate2.body).toEqual({
        success: false,
        message: 'Character count does not match the current level!',
    });
});

test('Able to check the answer coordinates', async () => {
    const token = await createPlayer(request, app, '320');

    const validate = await sendAnswer(request, app, token, [
        {
            characterId: 1,
            pctX: 0.5,
            pctY: 0.5,
        },
        {
            characterId: 2,
            pctX: 0.5,
            pctY: 0.5,
        },
    ]);

    expect(validate.status).toBe(400);
    expect(validate.body).toEqual({ success: false, invalidIds: [1, 2] });
});

afterAll(async () => {
    console.log(
        '###################### TRUNCATE START ######################\n',
    );
    await truncateAllTables();
    await prisma.$disconnect();
    console.log('###################### TRUNCATE END ######################\n');
});
