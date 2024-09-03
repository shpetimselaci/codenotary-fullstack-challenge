import knex from 'knex';
import { config } from '~/config';
import { DB_LOGGER } from '~/loggers/db';
import { Transaction } from '~/modules/transactions/schema';

declare module 'knex/types/tables' {
  // @ts-expect-error ts-2300
  type Tables = {
    transactions: Transaction;
  };
}

export type Result = {
  command: 'ok';
  rows: Array<Record<string, string>>;
  fields: Array<{
    name: string;
    tableID: number;
    columnID: number;
    dataTypeID: number;
    dataTypeSize: number;
    dataTypeModifier: number;
    format: string;
  }>;
};

export const db = knex({
  client: 'pg',
  connection: {
    host: config.IMMUDB_HOST,
    password: config.IMMUDB_PASSWORD,
    user: config.IMMUDB_USER,
    port: 5432,
    database: config.IMMUDB_DB,
    connectionTimeout: process.env.npm_lifecycle_event == 'umzug' ? 5000 : undefined,
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
