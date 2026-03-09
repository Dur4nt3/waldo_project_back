import crypto from 'crypto';

import type { Request } from 'express';

export function hashSessionToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateSessionToken(): {
    token: string;
    hash: string;
} {
    const token = crypto.randomBytes(32).toString('hex');

    const hash = hashSessionToken(token);

    return { token, hash };
}

// Return false if the token isn't valid
// Return the token's hash if it's valid
export function checkTokenValidity(req: Request) {
    const token = req.headers['session-token'];

    if (typeof token !== 'string' || token === null || token === undefined) {
        return false;
    }

    return hashSessionToken(token);
}
