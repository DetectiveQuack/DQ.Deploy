module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./__tests__'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json',
        },
    },
};
