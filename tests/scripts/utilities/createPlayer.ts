export default async function createPlayer(
    request: any,
    app: any,
    screenWidth: string,
) {
    const response = await request(app).post('/games/sessions').send({
        name: 'test',
        screenWidth,
    });

    return response.body.token;
}
