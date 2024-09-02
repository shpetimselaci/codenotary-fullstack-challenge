import { Client } from '@codenotary/immudb-node';
import { config } from '~/config';

export const immuDBClient = new Client({
  host: config.IMMUDB_HOST,
  port: config.IMMUDB_PORT,
  database: config.IMMUDB_DB,
  user: config.IMMUDB_USER,
  password: config.IMMUDB_PASSWORD,
});

export const closeConnection = () => {
  return immuDBClient.close();
};
