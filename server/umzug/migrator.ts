import { MigrationFn as MigrationFunction, MigrationParams, Umzug } from 'umzug';
import { MIGRATIONS_LOGGER } from '~/loggers/migrations';
import { immudbVaultClient } from '~/sdk/immudb-vault';

export type MigrationFn = MigrationFunction<{ queryBuilder: typeof immudbVaultClient }>;
const migrationsUmzug = new Umzug({
  context: () => ({
    queryBuilder: immudbVaultClient,
  }),

  migrations: {
    glob: 'umzug/migrations/*.ts',
    resolve: ({ name, path, context }: MigrationParams<{ queryBuilder: typeof immudbVaultClient }>) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-non-null-assertion
      const migration = require(path!) as { up: MigrationFn; down: MigrationFn };
      return {
        // adjust the parameters Umzug will
        // pass to migration methods when called
        name,
        up: () => migration.up({ name, path, context }),
        down: () => migration.down({ name, path, context }),
      };
    },
  },
  logger: MIGRATIONS_LOGGER,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
exports.umzug = migrationsUmzug;

if (require.main === module) {
  void migrationsUmzug.runAsCLI().then(() => process.exit());
}
