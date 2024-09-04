import { TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODES_BY_NUMBER } from '@trpc/server/rpc';
import { v7 as uuid } from 'uuid';
import { config } from '~/config';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { immudbVaultClient } from '~/sdk/immudb-vault';

import { TRANSACTIONS_COLLECTION_NAME } from './schema';
import { AddTransactionSchema } from './validation';

export const listAllTransactions = async ({ limit = 20, cursor = 0 }: { limit?: number; cursor?: number }) => {
  const { error, data } = await immudbVaultClient.POST('/ledger/{ledger}/collection/{collection}/documents/search', {
    params: {
      path: {
        ledger: config.IMMUDB_DB,
        collection: TRANSACTIONS_COLLECTION_NAME,
      },
    },
    body: {
      page: cursor,
      perPage: limit,
    },
  });
  if (error) {
    throw new TRPCError({
      code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR],
      message: error.error,
      cause: error,
    });
  }

  let nextCursor = data.page;
  const rows = data.revisions;
  if (limit == rows.length) {
    nextCursor += 1;
  }

  return {
    nextCursor,
    items: rows,
  };
};

export const addTransaction = async (values: AddTransactionSchema) => {
  const transactionId = uuid();

  const insert = {
    ...values,
    transaction_id: transactionId,
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

  const response = await immudbVaultClient.GET('/documents/{ref}', {
    params: {
      path: {
        ref: data.documentId,
      },
    },
  });

  if (response.error) {
    RUNTIME_LOGGER.error(response.error);
    throw new TRPCError({
      code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR],
      message: response.error.error,
      cause: response.error,
    });
  }

  return response.data.document;
};
