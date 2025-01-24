module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended', // Base rules
    'plugin:react/recommended', // React-specific rules
    'plugin:react/jsx-runtime', // Prevent issues with the new JSX runtime
    'plugin:next/recommended', // Next.js-specific rules
  ],
  rules: {
    'react/jsx-uses-react': 'off', // Disable old JSX runtime rule
    'react/react-in-jsx-scope': 'off', // Disable React in-scope rule for JSX runtime
    '@next/next/no-html-link-for-pages': 'off', // Optional: Disable if you use custom links
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
};
