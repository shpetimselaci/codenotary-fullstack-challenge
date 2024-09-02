import { fileURLToPath } from 'url';

import { configDefaults, defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    globals: true,
    exclude: [...configDefaults.exclude],
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
});
