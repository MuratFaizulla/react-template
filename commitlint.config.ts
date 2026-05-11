import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'chore', 'docs', 'perf', 'build', 'ci', 'revert']
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100]
  }
};

export default config;
