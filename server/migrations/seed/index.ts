import { sql } from 'kysely';
import type { MigrationFn } from '../../migrator';

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  return;
};

export const down: MigrationFn = async ({ context: { queryBuilder } }) => {
  const query = queryBuilder.schema.dropTable('transactions');
  return query.execute();
};
