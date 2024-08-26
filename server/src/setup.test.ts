import type http from 'http';
import fetch from 'node-fetch';
import SuperJSON from 'superjson';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { startServer as _startServer } from './server';
import { appRouter } from './trpc';
import {} from 'node:util';

async function startServer() {
  const { server, port } = await new Promise<{
    server: http.Server;
    port: number;
  }>(async (resolve) => {
    const server = await _startServer(42);

    resolve({
      server,
      port: 42,
    });
  });

  const client = createTRPCProxyClient<typeof appRouter>({
    links: [
      httpBatchLink({
        url: `http://localhost:${port}/trpc`,
        fetch: fetch as any,
      }),
    ],
    transformer: SuperJSON,
  });

  return {
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => {
          err ? reject(err) : resolve();
        });
      }),
    port,
    router: appRouter,
    client,
  };
}

let t: Awaited<ReturnType<typeof startServer>>;
beforeAll(async () => {
  t = await startServer();
});
afterAll(async () => {
  console.log('stopping');
  await t.close();
});

test('simple query', async () => {
  const res = await t.client.account.list.query();
  expect(res).toMatchInlineSnapshot(`
      []
    `);
});
