import { TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODES_BY_NUMBER } from '@trpc/server/rpc';
import { config } from '~/config';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { immudbVaultClient } from '~/sdk/immudb-vault';

import { Transaction, TRANSACTIONS_COLLECTION_NAME } from './schema';
import { AddTransactionSchema } from './validation';

export const listAllTransactions = async ({ limit = 20, cursor = 1 }: { limit?: number; cursor?: number }) => {
  const { error, data } = await immudbVaultClient.POST('/ledger/{ledger}/collection/{collection}/documents/search', {
    params: {
      path: {
        ledger: config.IMMUDB_LEDGER,
        collection: TRANSACTIONS_COLLECTION_NAME,
      },
    },
    body: {
      page: cursor,
      perPage: limit,
    },
  });

  if (error) {
    RUNTIME_LOGGER.error(error);

    throw new TRPCError({
      code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR],
      message: error.error,
      cause: error,
    });
  }

  let nextCursor;
  const rows = data.revisions;
  if (limit == rows.length) {
    nextCursor = cursor + 1;
  }

  return {
    nextCursor,
    items: rows.map(({ document }) => document as unknown as Transaction),
  };
};

export const addTransaction = async (values: AddTransactionSchema) => {
  const insert = {
    ...values,
    created_at: new Date().toISOString(),
  };

  RUNTIME_LOGGER.info('Inserting values into db...');

  const { error, data } = await immudbVaultClient.PUT('/ledger/{ledger}/collection/{collection}/document', {
    params: {
      path: {
        ledger: config.IMMUDB_LEDGER,
        collection: TRANSACTIONS_COLLECTION_NAME,
      },
    },
    body: insert,
  });

  if (error) {
    RUNTIME_LOGGER.error(error);

    throw new TRPCError({
      code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR],
      message: error.error,
      cause: error,
    });
  }

  return { ...insert, _id: data.documentId };
};
