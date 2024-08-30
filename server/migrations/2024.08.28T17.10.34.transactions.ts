import { sql } from 'kysely';
import type { MigrationFn } from '../migrator';

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  const query = queryBuilder.schema
    .createTable('transactions')
    .ifNotExists()
    .addColumn('transaction_id', sql`UUID NOT NULL`)
    .addColumn('account_number', sql`VARCHAR NOT NULL`)
    .addColumn('account_name', sql`VARCHAR NOT NULL`)
    // .addColumn('tr_type', sql`varchar`, (col) => col.notNull().check(sql`type IN ('receiving', 'sending')`)) // wont allow check?
    .addColumn('type', sql`VARCHAR[9] NOT NULL`)
    .addColumn('iban', sql`VARCHAR NOT NULL`)
    .addColumn('address', sql`VARCHAR NOT NULL`)
    // .addColumn('amount', 'integer', (col) => col.notNull().check(sql`amount > 0`))
    .addColumn('amount', sql`INTEGER NOT NULL`)
    .addColumn('created_at', sql`VARCHAR NOT NULL, PRIMARY KEY (transaction_id)`); // couldnt add primary key account_id in some other way -- hack!

  return query.execute();
};

export const down: MigrationFn = async ({ context: { queryBuilder } }) => {
  const query = queryBuilder.schema.dropTable('transactions');
  return query.execute();
};
