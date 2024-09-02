import knex, { Knex } from 'knex';
import { config } from '~/config';
import { DB_LOGGER } from '~/loggers/db';
import { Transaction } from '~/modules/transactions/schema';

declare module 'knex/types/tables' {
  interface Tables {
    transactions: Transaction;
    transactions_composite: Knex.CompositeTableType<
      Transaction,
      Pick<Transaction, 'transaction_id'> & Partial<Pick<Transaction, 'created_at'>>,
      Partial<Omit<Transaction, 'transaction_id' | 'created_at'>>
    >;
  }
}

export const db = knex({
  client: 'pg',
  connection: {
    host: config.IMMUDB_HOST,
    password: config.IMMUDB_PASSWORD,
    user: config.IMMUDB_USER,
    port: 5432,
    database: config.IMMUDB_DB,
  },
  version: '1.0',
  log: {
    warn(message) {
      DB_LOGGER.warn(message);
    },
    error(message) {
      DB_LOGGER.error(message);
    },
    deprecate(message) {
      DB_LOGGER.debug(message);
    },
    debug(message) {
      DB_LOGGER.debug(message);
    },
  },
});
