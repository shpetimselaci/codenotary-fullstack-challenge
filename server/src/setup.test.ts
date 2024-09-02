import type http from 'http';

import { createTRPCProxyClient, httpBatchLink, HttpBatchLinkOptions } from '@trpc/client';
import fetch from 'node-fetch';
import SuperJSON from 'superjson';

import { startServer as _startServer } from './server';
import { appRouter } from './trpc';
import {} from 'node:util';

async function startServer() {
  const { server, port } = await new Promise<{
    server: http.Server;
    port: number;
  }>((resolve) => {
    const port = Math.round(Math.random() * 1000);
    const server = _startServer(port);

    resolve({
      server,
      port,
    });
  });

  const client = createTRPCProxyClient<typeof appRouter>({
    links: [
      httpBatchLink({
        url: `http://localhost:${port}/trpc`,
        fetch: fetch as HttpBatchLinkOptions['fetch'],
      }),
    ],
    transformer: SuperJSON,
  });

  return {
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }),
    port,
    router: appRouter,
    client,
  };
}

export let t: Awaited<ReturnType<typeof startServer>>;
beforeAll(async () => {
  t = await startServer();
});
afterAll(async () => {
  await t.close();
});

test('Simple test', () => {
  expect(1).toBe(1);
});
