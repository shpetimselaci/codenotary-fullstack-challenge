import { config } from '~/config';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { TRANSACTIONS_COLLECTION_NAME } from '~/modules/transactions/schema';

import type { MigrationFn } from '../migrator';

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  const response = await queryBuilder.PUT('/ledger/{ledger}/collection/{collection}', {
    params: {
      path: {
        ledger: config.IMMUDB_LEDGER,
        collection: TRANSACTIONS_COLLECTION_NAME,
      },
    },
    body: {
      fields: [
        {
          name: 'account_number',
          type: 'STRING',
        },
        {
          name: 'account_name',
          type: 'STRING',
        },
        {
          name: 'type',
          type: 'STRING',
        },
        {
          name: 'iban',
          type: 'STRING',
        },
        {
          name: 'created_at',
          type: 'STRING',
        },
        {
          name: 'amount',
          type: 'DOUBLE',
        },
      ],
    },
  });
  if (response.error) {
    RUNTIME_LOGGER.error(response.error);
    throw new Error(response.error.error);
  }
  return response;
};

export const down: MigrationFn = async ({ context: { queryBuilder } }) => {
  const response = await queryBuilder.DELETE('/ledger/{ledger}/collection/{collection}', {
    params: {
      path: {
        ledger: config.IMMUDB_LEDGER,
        collection: TRANSACTIONS_COLLECTION_NAME,
      },
    },
  });

  if (response.error) {
    RUNTIME_LOGGER.error(response.error);
    throw new Error(response.error.error);
  }

  return response;
};
