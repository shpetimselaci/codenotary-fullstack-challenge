import { Procedure, Router } from 'trpc';
import { accountSchema, listInboundSchema, listOutboundSchema } from './validation';
import { listAllTransactions } from './service';

export const transactionsRouter = (router: Router, procedure: Procedure) => {
  return router({
    list: procedure
      .input(listInboundSchema)
      .output(listOutboundSchema)
      .query(async (s) => {
        return listAllTransactions(s.input);
      }),
    add: procedure.input(accountSchema).mutation(async () => {}),
  });
};
