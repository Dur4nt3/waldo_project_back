// "any" on the answerArray is on purpose
// this allows testing the controller with improper data
export default async function sendAnswer(
    request: any,
    app: any,
    token: string,
    answerArray: any,
) {
    const response = await request(app)
        .post('/games/sessions/current/answer')
        .set('Session-Token', token)
        .send({
            locations: answerArray,
        });

    return response;
}
