import type { MigrationFn } from '../migrator';

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  const query = queryBuilder.raw(
    `create table if not exists transactions (
      transaction_id UUID,
      account_number varchar,
      account_name varchar,
      type varchar[9],
      iban varchar,
      address varchar[255],
      created_at varchar[255],
      amount integer,
      primary key transaction_id
    );`,
  );

  return query;
};

export const down: MigrationFn = async ({ context: { queryBuilder } }) => {
  const query = queryBuilder.schema.dropTable('transactions');
  return query;
};
