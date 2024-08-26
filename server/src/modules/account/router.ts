import { Procedure, Router } from 'trpc';

export const accountRouter = (router: Router, procedure: Procedure) =>
  router({
    list: procedure.query(async () => {
      return [];
    }),
    add: procedure.mutation(async () => {}),
  });
