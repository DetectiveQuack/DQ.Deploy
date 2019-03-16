import { Request } from 'express';

export interface DQRequest extends Request {
    branches: object;
    responseUrl: string;
}
