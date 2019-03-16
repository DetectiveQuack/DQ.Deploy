import request from 'request-promise';

export function makeRequest(url: string): request.RequestPromise {
    return request.get(`https://api.bitbucket.org/2.0${url}`, {
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        json: true,
    });
}
