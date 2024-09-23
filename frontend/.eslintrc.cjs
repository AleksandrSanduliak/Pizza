module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'no-var': 'error',
    'prefer-const': 'warn',
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.cjs'],
      env: {
        es2023: true,
        node: true,
      },
    },
  ],
};
