import { db, pool } from '~/sdk/kesley';
import { v7 as uuid } from 'uuid';
import { getInsertStringified } from '~/utils/db';
import { AddTransactionSchema } from './validation';

export const listAllTransactions = async ({ limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
  const query = await db.selectFrom('transactions').selectAll().limit(limit).offset(offset).execute();
  return query;
};

export const addTransaction = async (values: AddTransactionSchema) => {
  let transactionId = uuid();

  const insert = {
    ...values,
    transaction_id: transactionId,
    created_at: new Date().toISOString(),
  };

  const { columns: cols, values: vals } = getInsertStringified(insert);
  await pool.query(`insert into transactions (${cols}) values (${vals})`);
  return insert;
};
