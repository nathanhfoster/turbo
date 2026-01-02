import { config } from '@nathanhfoster/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];

