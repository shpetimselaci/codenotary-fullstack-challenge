import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { appRouter } from './trpc';
import { loginToImmuDB, logoutImmuDB } from '~/sdk/immudb';
import { createContext } from './context';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  }),
);

app.use('/', (_req, res) => {
  return res.type('application/json').status(200).json('ok');
});

export const startServer = async (port: number) => {
  await loginToImmuDB();
  let server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  let loggedOut = false;
  process.on('SIGTERM', () => {
    if (!loggedOut) {
      loggedOut = true;
      logoutImmuDB();
    }
    server.close();
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    if (!loggedOut) {
      loggedOut = true;
      logoutImmuDB();
    }
    server.close();
  });

  return server;
};
