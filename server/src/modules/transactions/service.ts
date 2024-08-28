import { db } from '~/sdk/kesley';

export const listAllTransactions = async ({ limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
  const query = await db.selectFrom('transactions').selectAll().limit(limit).offset(offset).execute();
  return query;
};
