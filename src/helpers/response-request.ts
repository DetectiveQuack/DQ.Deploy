import request from 'request-promise';

export default async function makeSlackResponse(responseUrl: string, body: object) {
    await request.post(responseUrl, {
        body,
        json: true,
    });
}
