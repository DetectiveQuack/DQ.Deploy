import request from 'request-promise';
import { BitbucketBranch } from '../models/branch';

class Bitbucket {
    private constructor() {}

    private static makeRequest(url: string) {
        return request.get(`https://api.bitbucket.org/2.0${url}`, {
            auth: {
                user: process.env.GIT_USER,
                pass: process.env.GIT_PASS,
            },
            json: true,
        });
    }

    public static async getBranches(username: string, repo: string): Promise<BitbucketBranch[]> {
        const { values } = await this.makeRequest(`/repositories/${username}/${repo}/refs/branches?sort=-target.date`);

        return values;
    }
}

export default Bitbucket;
