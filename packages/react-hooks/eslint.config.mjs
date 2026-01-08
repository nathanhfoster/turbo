import { config } from '@nathanhfoster/eslint-config/react-internal';

export default [
  ...config,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
];
