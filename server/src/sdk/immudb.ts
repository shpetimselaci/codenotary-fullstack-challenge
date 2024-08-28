import { config } from '~/config';
import { Client, types } from '@codenotary/immudb-node';

export let immuDBClient: Client;

export const setupImmuDb = () =>
  (immuDBClient = new Client({
    host: config.IMMUDB_HOST,
    port: config.IMMUDB_PORT,
    database: config.IMMUDB_DB,
    user: config.IMMUDB_USER,
    password: config.IMMUDB_PASSWORD,
  }));

export const closeConnection = () => {
  return immuDBClient?.close();
};
