module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:import/errors',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'array-callback-return': 'warn',
    'arrow-body-style': ['warn', 'always'],
    curly: 'error',
    'eol-last': ['error', 'always'],
    'no-console': 'error',
    'no-restricted-globals': [
      'error',
      ...['name', 'event', 'location'].map((global) => {
        return {
          name: global,
          message: `Did you mean to declare a local \`${global}\`? If not, use \`window.${global}\` instead.`,
        };
      }),
    ],
    'no-var': 'error',
    'prefer-object-spread': 'error',

    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'warn',

    'react/display-name': 'off',
    'react/jsx-uses-react': 'error',
    'react/prop-types': ['warn', { skipUndeclared: true }],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    'import/first': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  overrides: [
    {

      files: ['**/*.js'],
      // JavaScript files shouldn't be validated with TypeScript-specific rules.
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', '*.config.js', 'extension/*'],
};
