import { MigrationFn, MigrationParams, Umzug } from 'umzug';
import { SEEDER_LOGGER } from '~/loggers/migrations';
import { db } from '~/sdk/knex';

export const umzug = new Umzug({
  context: () => ({
    queryBuilder: db,
  }),

  migrations: {
    glob: 'umzug/seeders/*.ts',
    resolve: ({ name, path, context }: MigrationParams<{ queryBuilder: typeof db }>) => {
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
  logger: SEEDER_LOGGER,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
exports.umzug = umzug;

if (require.main === module) {
  void umzug.runAsCLI().then(() => process.exit());
}
