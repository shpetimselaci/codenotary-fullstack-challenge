import type { MigrationFn } from '../migrator';

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  const response = await queryBuilder.PUT('/ledger/{ledger}/collection/{collection}', {
    params: {
      path: {
        ledger: 'default',
        collection: 'transactions',
      },
    },
    body: {
      fields: [
        {
          name: 'transaction_id',
          type: 'STRING',
        },
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
    throw new Error(response.error.error);
  }
  return response;
};

export const down: MigrationFn = async ({ context: { queryBuilder } }) => {
  return queryBuilder.DELETE('/ledger/{ledger}/collection/{collection}', {
    params: {
      path: {
        ledger: 'default',
        collection: 'transactions',
      },
    },
  });
};
