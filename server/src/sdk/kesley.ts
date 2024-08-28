import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '~/modules/database';
import { Pool } from 'node-postgres';
import { config } from '~/config';

const dialect = new PostgresDialect({
  pool: new Pool({
    host: config.IMMUDB_HOST,
    password: config.IMMUDB_PASSWORD,
    user: config.IMMUDB_USER,
    port: 5432,
    database: config.IMMUDB_DB,
  }),
});

export const db = new Kysely<Database>({
  dialect: dialect,
});
