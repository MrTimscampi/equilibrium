module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // Prettier conflicts
        'vue/html-indent': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
    },
};
