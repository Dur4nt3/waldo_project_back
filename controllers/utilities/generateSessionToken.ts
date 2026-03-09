import crypto from 'crypto';

export default function generateSessionToken(): {
    token: string;
    hash: string;
} {
    const token = crypto.randomBytes(32).toString('hex');

    const hash = crypto.createHash('sha256').update(token).digest('hex');

    return { token, hash };
}
