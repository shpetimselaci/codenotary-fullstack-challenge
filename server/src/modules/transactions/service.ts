import { v7 as uuid } from 'uuid';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { db, Result } from '~/sdk/knex';
import { unWrapRows } from '~/utils/db';

import { Transaction } from './schema';
import { AddTransactionSchema } from './validation';

export const listAllTransactions = async ({ limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
  const query = db.select('*').table('transactions').offset(offset).limit(limit).orderBy('created_at', 'asc').toQuery();
  const result = await (db.raw(query) as Promise<Result>);
  return unWrapRows<Transaction>(result);
};

export const addTransaction = async (values: AddTransactionSchema) => {
  const transactionId = uuid();

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

  const raw = await (db.raw<Result>(insertedRowQuery) as Promise<Result>);

  return unWrapRows<Transaction>(raw)[0];
};
