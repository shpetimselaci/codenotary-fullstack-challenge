import { MigrationFn as MigrationFunction, Umzug } from 'umzug';
import { db } from '~/sdk/kesley';

export type MigrationFn = MigrationFunction<{ queryBuilder: typeof db }>;
const umzug = new Umzug({
  context: () => ({
    queryBuilder: db,
  }),
  migrations: { glob: 'migrations/*.ts' },
  logger: console,
});

exports.umzug = umzug;

if (require.main === module) {
  umzug.runAsCLI();
}
