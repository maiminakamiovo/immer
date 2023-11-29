module.exports = {
    extends: require.resolve('@umijs/max/eslint'),
    rules: {
        semi: 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'block-spacing': 'off',
    },
};
