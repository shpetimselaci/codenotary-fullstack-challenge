import { Procedure, Router } from 'trpc';
import { addedTransactionSchema, addTransactionSchema, listInboundSchema, listOutboundSchema } from './validation';
import { addTransaction, listAllTransactions } from './service';

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
