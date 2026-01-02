import { config } from '@nathanhfoster/eslint-config/react-internal';

export default [
  ...config,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
    },
  },
];
