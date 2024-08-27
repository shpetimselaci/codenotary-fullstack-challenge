import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { appRouter } from './trpc';
import { closeConnection, setupImmuDb } from '~/sdk/immudb';
import { createContext } from './context';
import { renderTrpcPanel } from 'trpc-panel';
import { config } from './config';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  }),
);

app.use('/health', (_req, res) => {
  return res.type('application/json').status(200).json('ok');
});

export const startServer = async (port: number) => {
  if (config.NODE_ENV === 'development' && config.MODE !== 'test') {
    app.use('/', (_, res) => {
      return res.send(renderTrpcPanel(appRouter, { url: `http://localhost:${port}/docs`, transformer: 'superjson' }));
    });
  }
  await setupImmuDb();
  let server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  let loggedOut = false;
  process.on('SIGTERM', () => {
    if (!loggedOut) {
      loggedOut = true;
      closeConnection();
    }
    server.close();
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    if (!loggedOut) {
      loggedOut = true;
      closeConnection();
    }
    server.close();
  });

  return server;
};
