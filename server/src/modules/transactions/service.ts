import { v7 as uuid } from 'uuid';
import { AddTransactionSchema } from './validation';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { db } from '~/sdk/knex';
import { unWrapRows } from '~/utils/db';
import { Transaction } from './schema';

export const listAllTransactions = async ({ limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
  const query = db.select('*').table('transactions').offset(offset).limit(limit).orderBy('created_at', 'asc').toQuery();
  let result = await db.raw(query);
  return unWrapRows<Transaction>(result);
};

export const addTransaction = async (values: AddTransactionSchema) => {
  let transactionId = uuid();

  const insert = {
    ...values,
    transaction_id: transactionId,
    created_at: new Date().toISOString(),
  };

  RUNTIME_LOGGER.info('Inserting values into db...');

  const query = db('transactions').insert(insert).toQuery();

  await db.raw(query); // inserting..
  const insertedRowQuery = db
    .from('transactions')
    .select()
    .first()
    .whereRaw(`transaction_id = '${transactionId}'::UUID`)
    .toQuery();

  const raw = await db.raw(insertedRowQuery);

  return unWrapRows<Transaction>(raw)[0];
};
