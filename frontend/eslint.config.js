// import { fixupPluginRules } from '@eslint/compat';
// import js from '@eslint/js';
// import eslintConfigPrettier from 'eslint-config-prettier';
// import prettierPlugin from 'eslint-plugin-prettier';
// import eslintReact from 'eslint-plugin-react';
// import eslintReactHooks from 'eslint-plugin-react-hooks';
// import eslintReactRefresh from 'eslint-plugin-react-refresh';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// /** @type {import('eslint').Linter.FlatConfig[]} */
// export default tseslint.config(
//   {
//     plugins: {
//       '@typescript-eslint': tseslint.plugin,
//       'react-hooks': fixupPluginRules(eslintReactHooks),
//       react: eslintReact,
//       'react-refresh': eslintReactRefresh,
//       prettier: prettierPlugin,
//     },
//     ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
//   },
//   {
//     languageOptions: {
//       ...eslintReact.configs.flat.recommended.languageOptions,
//       globals: {
//         ...globals.browser,
//         ...globals.es2021,
//         ...globals.node,
//       },
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//         project: ['tsconfig.json', 'tsconfig.node.json'],
//         project: true,
//         tsconfigRootDir: './',
//       },
//     },
//   },
//   {
//     files: ['**/*.{ts,tsx}'],
//     rules: {
//       // ...eslintReact.configs.flat.recommended,
//       ...eslintConfigPrettier.rules,
//       ...eslintReactHooks.configs.recommended.rules,
//       'react-hooks/exhaustive-deps': 'error',
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//       'space-before-function-paren': [
//         'error',
//         {
//           anonymous: 'always',
//           named: 'always',
//           asyncArrow: 'always',
//         },
//       ],
//       'react/jsx-curly-brace-presence': [
//         'warn',
//         { props: 'never', children: 'never' },
//       ],
//       'react/function-component-definition': [
//         'warn',
//         { namedComponents: 'arrow-function' },
//       ],
//       'react/self-closing-comp': ['error', { component: true, html: true }],
//     },
//   },
//   // ...fixupPluginRules(eslintReactHooks),
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
// );

import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': fixupPluginRules(eslintReactHooks),
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function' },
      ],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/exhaustive-deps': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      semi: 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'no-use-before-define': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
