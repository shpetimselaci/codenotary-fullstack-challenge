/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { EnvSchema } from 'config';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}
