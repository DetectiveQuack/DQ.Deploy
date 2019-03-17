import { Request } from 'express';

export default interface DQRequest extends Request {
    branches: object;
    responseUrl: string;
    commands: string[];
}
