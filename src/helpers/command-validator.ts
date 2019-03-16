import { NextFunction, Response } from 'express';
import { DQRequest } from '../models/request';
import { Bitbucket } from '../services/bitbucket';
import { jsonResponse } from './response';

const validateText = async (text: string) => {
    const branches: { client: object | null; api: object | null; error: string | null } = {
        client: null,
        api: null,
        error: null,
    };

    if (!text || text.split(' ').length < 2) {
        branches.error = 'Typing `/deploy [Client branch] [API branch]` will build and deploy to preprod';

        return branches;
    }

    const [client, api] = text.split(' ');

    const clientBranch = await Bitbucket.branchExists(client, process.env.CLIENT_NAME!);
    const apiBranch = await Bitbucket.branchExists(api, process.env.API_NAME!);

    if (!clientBranch && !apiBranch) {
        branches.error = 'Both Client and API branches do not exist, branches are case sensitive';
    }

    if (!clientBranch) {
        branches.error = 'Client branch does not exist, branches are case sensitive';
    }

    if (!apiBranch) {
        branches.error = 'API branch does not exist, branches are case sensitive';
    }

    return branches;
};

export async function validate(req: DQRequest, res: Response, next: NextFunction) {
    const branches = await validateText(req.body.text);

    if (!branches.error) {
        req.branches = branches;
        return next();
    }

    return res.json(
        jsonResponse({
            text: branches.error,
        }),
    );
}
