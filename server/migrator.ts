import { MigrationFn as MigrationFunction, Umzug } from 'umzug';
import { db } from '~/sdk/knex';

export type MigrationFn = MigrationFunction<{ queryBuilder: typeof db }>;
const umzug = new Umzug({
  context: () => ({
    queryBuilder: db,
  }),
  migrations: { glob: 'migrations/*.ts' },
  logger: console,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
exports.umzug = umzug;

if (require.main === module) {
  void umzug.runAsCLI();
}
