import { NextFunction, Request, Response } from 'express';
import jsonResponse from './response';
import DQRequest from '../models/request';

export default async function parseCommand(req: Request, res: Response, next: NextFunction) {
    const text = req.body.text;
    let errMsg = null;

    if (!text || text.split(' ').length < 2) {
        errMsg = 'Typing `/deploy [Client branch] [API branch]` will build and deploy';
    }

    if (!errMsg) {
        const response = jsonResponse({ text: 'build initiated' });

        (req as DQRequest).commands = text.split(' ');
        res.json(response);
        return next();
    }

    return res.json(
        jsonResponse({
            text: errMsg,
        }),
    );
}
