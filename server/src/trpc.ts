import { initTRPC } from '@trpc/server';
import { transactionsRouter } from './modules/transactions/router';
import superjson from 'superjson';
import { Context } from './context';

const t = initTRPC.context<Context>().create({ transformer: superjson });

export type Router = typeof t.router;
export type Procedure = typeof t.procedure;
export type MiddleWare = typeof t.middleware;

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

export const appRouter = router({
  transactions: transactionsRouter(router, publicProcedure),
});

export type AppRouter = typeof appRouter;
