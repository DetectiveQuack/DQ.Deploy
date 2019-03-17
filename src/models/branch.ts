export interface BitbucketBranch {
    name: string;
    target: BitbucketBranchTarget;
}

interface BitbucketBranchTarget {
    hash: string;
}
