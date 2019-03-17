module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./test'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json',
        },
    },
};
