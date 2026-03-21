export default async function getProgressData(
    request: any,
    app: any,
    token: string,
) {
    const progress = await request(app)
        .get('/games/sessions/current/levels')
        .set('Session-Token', token);

    return progress;
}
