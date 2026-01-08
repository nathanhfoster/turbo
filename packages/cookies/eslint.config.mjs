import { config } from '@nathanhfoster/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
];
