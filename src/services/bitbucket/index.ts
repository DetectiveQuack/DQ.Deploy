import { makeRequest } from './make-request';

export class Bitbucket {
    private constructor() {}

    public static async branchExists(branch: string, repo: string) {
        const { values } = await makeRequest(
            `/repositories/${process.env.USERNAME}/${repo}/refs/branches?q=name = "${branch}"`,
        );

        if (!values.length) {
            return null;
        }

        return values[0];
    }
}
