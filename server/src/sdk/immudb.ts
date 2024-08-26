import { config } from '~/config';
import ImmudbClient from 'immudb-node';
import Parameters from 'immudb-node/dist/types/parameters';

export const immuDBClient = new ImmudbClient({ host: config.IMMUDB_HOST, port: config.IMMUDB_PORT });

export const loginToImmuDB = async () => {
  return immuDBClient.login({ password: config.IMMUDB_PASSWORD, user: config.IMMUDB_USER } as Parameters.Login);
};

export const logoutImmuDB = () => {
  return immuDBClient.logout();
};
