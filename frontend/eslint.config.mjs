import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'next/core-web-vitals',
      'plugin:@next/next/recommended',
      'next/typescript',
      'prettier',
    ],
    rules: {
      camelcase: 'error',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      // 'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      semi: 'error',
      'import/newline-after-import': [2, { count: 1 }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
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
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
    },
  }),
];

export default eslintConfig;
