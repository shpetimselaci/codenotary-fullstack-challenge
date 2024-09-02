import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { renderTrpcPanel } from 'trpc-panel';
import { closeConnection } from '~/sdk/immudb';

import { config } from './config';
import { createContext } from './context';
import { RUNTIME_LOGGER } from './loggers/server';
import { appRouter } from './trpc';

const app: ReturnType<typeof express> = express();

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

export const startServer = (port: number) => {
  if (config.NODE_ENV === 'development' && config.MODE !== 'test') {
    app.use('/', (_, res) => {
      return res.send(renderTrpcPanel(appRouter, { url: `http://localhost:${port}/docs`, transformer: 'superjson' }));
    });
  }
  const server = app.listen(port, () => {
    RUNTIME_LOGGER.info(`Server running on http://localhost:${port}`);
  });
  let loggedOut = false;
  process.on('SIGTERM', () => {
    RUNTIME_LOGGER.info('SIGTERM signal received.');

    if (!loggedOut) {
      loggedOut = true;
      void closeConnection();
    }
    server.close();
  });

  process.on('SIGINT', () => {
    RUNTIME_LOGGER.info('SIGINT signal received.');
    if (!loggedOut) {
      loggedOut = true;
      void closeConnection();
    }
    server.close();
  });

  return server;
};
