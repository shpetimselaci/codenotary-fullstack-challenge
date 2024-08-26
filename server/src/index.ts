import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

import { config } from './config';
import { createContext } from './trpc';
import { appRouter } from './trpc/router';
import { loginToImmuDB, logoutImmuDB } from 'sdk/immudb';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use('/', (_req, res) => {
  return res.type('application/json').status(200).json('ok');
});

const PORT = config.PORT;

const start = async () => {
  await loginToImmuDB();
  let server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(() => {
      logoutImmuDB();
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    server.close(() => {
      logoutImmuDB();
    });
  });
};

start();
