import Bitbucket from './bitbucket';
import { Dialog } from '@slack/client';

class SlackDialog {
    public static async createElements(): Promise<Dialog['elements']> {
        const username = process.env.GIT_USERNAME!;

        const clientBranches = await Bitbucket.getBranches(username, process.env.GIT_CLIENT_REPO_NAME!);
        const apiBranches = await Bitbucket.getBranches(username, process.env.GIT_API_REPO_NAME!);

        return [
            {
                type: 'select',
                name: 'client branch',
                label: 'Client Branch',
                options: clientBranches.map(b => ({
                    label: b.name,
                    value: b.target.hash,
                })),
            },
            {
                type: 'select',
                name: 'api branch',
                label: 'API Branch',
                options: apiBranches.map(b => ({
                    label: b.name,
                    value: b.target.hash,
                })),
            },
        ];
    }
}

export default SlackDialog;
