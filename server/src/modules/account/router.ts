import { Procedure, Router } from 'trpc';
import { accountSchema, listInboundSchema, listOutboundSchema } from './validation';

export const accountRouter = (router: Router, procedure: Procedure) =>
  router({
    list: procedure
      .input(listInboundSchema)
      .output(listOutboundSchema)
      .query(async () => {
        return [];
      }),
    add: procedure.input(accountSchema).mutation(async () => {}),
  });
