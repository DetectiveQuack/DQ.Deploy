import Bitbucket from '../../src/services/bitbucket';
import request from 'request-promise';

describe('Bitbucket', () => {
    test('it should make a request to bitbucket api 2.0', async () => {
        request.get = jest.fn().mockImplementationOnce(() => ({ values: [] }));

        await Bitbucket.getBranches('username', 'repo');

        expect(request.get).toHaveBeenCalledTimes(1);
    });

    test('it should get the branches sorted by date descending', async () => {
        const spy = jest.spyOn(request, 'get').mockResolvedValue({
            values: [],
        });

        process.env.GIT_USER = 'my git user';
        process.env.GIT_PASS = 'my git pass';

        expect(await Bitbucket.getBranches('username', 'repo')).toEqual([]);
        expect(spy).toBeCalledWith(
            'https://api.bitbucket.org/2.0/repositories/username/repo/refs/branches?sort=-target.date',
            { auth: { pass: process.env.GIT_PASS, user: process.env.GIT_USER }, json: true },
        );

        delete process.env.GIT_USER;
        delete process.env.GIT_PASS;
        spy.mockRestore();
    });
});
