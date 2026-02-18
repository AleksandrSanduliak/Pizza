// eslint.config.mjs - переименуйте файл в .mjs
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  // Базовые правила
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // React
  react.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },

  // Next.js
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
    },
  },

  // FSD правила и импорты
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/internal-regex': '^(@app|@widgets|@features|@entities|@shared)(/|$)',
    },
    rules: {
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/prefer-default-export': 'off',
      'import/no-namespace': 'error',
      'react/react-in-jsx-scope': 'off',
      camelcase: 'error',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
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
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      'import/named': 'error',
      'import/default': 'error',
      'import/no-absolute-path': 'error',
    },
  },
];
