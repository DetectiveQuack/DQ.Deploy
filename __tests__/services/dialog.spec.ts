import Bitbucket from '../../src/services/bitbucket';
import SlackDialog from '../../src/services/dialog';

describe('Dialog', () => {
    test('it should create elements', async () => {
        const spy = jest.spyOn(Bitbucket, 'getBranches').mockResolvedValue([
            {
                name: 'test',
                target: {
                    hash: 'test',
                },
            },
        ]);

        process.env.GIT_CLIENT_REPO_NAME = 'client';
        process.env.GIT_API_REPO_NAME = 'api';

        const elements = await SlackDialog.createElements();

        expect(spy).toBeCalledTimes(2);

        expect(elements).toEqual([
            {
                label: 'Client Branch',
                name: 'client branch',
                options: [{ label: 'test', value: 'test' }],
                type: 'select',
            },
            {
                label: 'API Branch',
                name: 'api branch',
                options: [{ label: 'test', value: 'test' }],
                type: 'select',
            },
        ]);

        delete process.env.GIT_CLIENT_REPO_NAME;
        delete process.env.GIT_API_REPO_NAME;

        spy.mockRestore();
    });
});
