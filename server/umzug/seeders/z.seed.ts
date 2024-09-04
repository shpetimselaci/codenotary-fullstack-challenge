import { config } from '~/config';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { Transaction, TRANSACTIONS_COLLECTION_NAME } from '~/modules/transactions/schema';

import type { MigrationFn } from '../migrator';

const seeders = [
  {
    account_name: 'Investment Account',
    account_number: '602919300',
    type: 'receiving',
    iban: 'XK191779563079154043',
    address: '82948 Howell Manors',
    amount: 49441,
    created_at: '2024-09-04T05:17:19.662Z',
  },
  {
    account_name: 'Savings Account',
    account_number: '722141746',
    type: 'sending',
    iban: 'XK051005080209274001',
    address: '107 Maple Street',
    amount: 76431,
    created_at: '2024-09-03T18:22:50.123Z',
  },
  {
    account_name: 'Home Loan Account',
    account_number: '849953468',
    type: 'receiving',
    iban: 'XK854142079200180493',
    address: '402 Erika Mill',
    amount: 4053,
    created_at: '2024-09-04T00:46:44.124Z',
  },
] as Array<Transaction>;

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  const response = await queryBuilder.PUT('/ledger/{ledger}/collection/{collection}/documents', {
    params: {
      path: {
        ledger: config.IMMUDB_LEDGER,
        collection: TRANSACTIONS_COLLECTION_NAME,
      },
    },
    body: {
      documents: seeders as unknown as Array<Record<string, never>>,
    },
  });
  if (response.error) {
    RUNTIME_LOGGER.error(response.error);
    throw new Error(response.error.error);
  }

  return response;
};

export const down: MigrationFn = async () => {
  //
};
