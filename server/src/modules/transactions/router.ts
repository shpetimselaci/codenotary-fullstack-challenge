import { Procedure, Router } from 'trpc';

import { addTransaction, listAllTransactions } from './service';
import { addedTransactionSchema, addTransactionSchema, listInboundSchema, listOutboundSchema } from './validation';

export const transactionsRouter = (router: Router, procedure: Procedure) => {
  return router({
    list: procedure
      .input(listInboundSchema)
      .output(listOutboundSchema)
      .query(async (r) => {
        return listAllTransactions(r.input);
      }),
    add: procedure
      .input(addTransactionSchema)
      .output(addedTransactionSchema)
      .mutation((r) => addTransaction(r.input)),
  });
};
