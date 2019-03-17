import Bitbucket from '../services/bitbucket';

const getErrorMsg = (client: object, api: object) => {
    if (!client && !api) {
        return 'Both Client and API branches do not exist, branches are case sensitive';
    }

    if (!client) {
        return 'Client branch does not exist, branches are case sensitive';
    }

    if (!api) {
        return 'API branch does not exist, branches are case sensitive';
    }

    return null;
};

const validateText = async (branches: string[]) => {
    const branchResults: { client: object | null; api: object | null; error: string | null } = {
        client: null,
        api: null,
        error: null,
    };

    const [client, api] = branches;

    let clientBranch = null;
    let apiBranch = null;

    try {
        clientBranch = await Bitbucket.branchExists(client, process.env.CLIENT_REPO_NAME!);
        apiBranch = await Bitbucket.branchExists(api, process.env.API_REPO_NAME!);
    } catch (err) {
        branchResults.error = `Something went wrong with Bitbucket ${err.toString()}`;
        return branchResults;
    }

    branchResults.error = getErrorMsg(clientBranch, apiBranch);

    return branchResults;
};

export default async function validate(commands: string[]) {
    const branches = await validateText(commands);

    return branches;
}
