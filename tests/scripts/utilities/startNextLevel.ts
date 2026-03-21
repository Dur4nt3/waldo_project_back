export default async function startNextLevel(
    request: any,
    app: any,
    token: string,
) {
    const response = await request(app)
        .post('/games/sessions/current/levels')
        .set('Session-Token', token);

    return response;
}
