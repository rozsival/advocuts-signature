const productionError =
  process.env.NODE_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  env: {
    browser: false,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'unicorn',
    'unused-imports',
  ],
  root: true,
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    'consistent-return': 'off',
    curly: ['error', 'multi-line'],
    'default-case': 'off',
    'function-paren-newline': 'off',
    'guard-for-in': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-confusing-arrow': 'off',
    'no-console': productionError,
    'no-debugger': productionError,
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-object-from-entries': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
