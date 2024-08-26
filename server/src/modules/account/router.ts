import { Procedure, Router } from 'trpc';
import { listInboundSchema, listOutboundSchema } from './validation';

export const accountRouter = (router: Router, procedure: Procedure) =>
  router({
    list: procedure
      .input(listInboundSchema)
      .output(listOutboundSchema)
      .query(async () => {
        return [];
      }),
    add: procedure.mutation(async () => {}),
  });
