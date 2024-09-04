import { config } from '~/config';
import { RUNTIME_LOGGER } from '~/loggers/server';
import { Transaction, TRANSACTIONS_COLLECTION_NAME } from '~/modules/transactions/schema';

import type { MigrationFn } from '../migrator';

const seeders = [
  {
    transaction_id: '0191bcc1-e276-7dd9-b1d2-cbf0ff9a0e0c',
    account_name: 'Investment Account',
    account_number: '602919300',
    type: 'receiving',
    iban: 'XK191779563079154043',
    address: '82948 Howell Manors',
    amount: 49441,
    created_at: '2024-09-04T05:17:19.662Z',
  },
  {
    transaction_id: '0191bcc1-e279-7dd9-b1d2-d66cb3ce9ca4',
    account_name: 'Savings Account',
    account_number: '722141746',
    type: 'sending',
    iban: 'XK051005080209274001',
    address: '107 Maple Street',
    amount: 76431,
    created_at: '2024-09-03T18:22:50.123Z',
  },
  {
    transaction_id: '0191bcc1-e279-7dd9-b1d2-df8015843de8',
    account_name: 'Home Loan Account',
    account_number: '849953468',
    type: 'receiving',
    iban: 'XK854142079200180493',
    address: '402 Erika Mill',
    amount: 4053,
    created_at: '2024-09-04T00:46:44.124Z',
  },
  {
    transaction_id: '0191bcc1-e279-7dd9-b1d2-e6de043f7ab9',
    account_name: 'Personal Loan Account',
    account_number: '340028128',
    type: 'receiving',
    iban: 'XK290874820044002849',
    address: '87230 Lebsack Road',
    amount: 16102,
    created_at: '2024-09-03T16:57:32.116Z',
  },
  {
    transaction_id: '0191bcc1-e279-7dd9-b1d2-ea95be431949',
    account_name: 'Money Market Account',
    account_number: '879120284',
    type: 'receiving',
    iban: 'XK070424760900110500',
    address: '469 Church Street',
    amount: 89843,
    created_at: '2024-09-03T19:46:17.885Z',
  },
  {
    transaction_id: '0191bcc1-e279-7dd9-b1d2-f71c9eafb5dd',
    account_name: 'Personal Loan Account',
    account_number: '930461040',
    type: 'sending',
    iban: 'XK750014918980066663',
    address: '7999 School Street',
    amount: 93281,
    created_at: '2024-09-03T11:39:27.709Z',
  },
  {
    transaction_id: '0191bcc1-e27a-7dd9-b1d2-fc29e61a5130',
    account_name: 'Investment Account',
    account_number: '820361703',
    type: 'sending',
    iban: 'XK737001030329100544',
    address: '384 E Grand Avenue',
    amount: 96317,
    created_at: '2024-09-03T20:07:01.488Z',
  },
  {
    transaction_id: '0191bcc1-e27a-7dd9-b1d3-06fabb77916e',
    account_name: 'Auto Loan Account',
    account_number: '555789950',
    type: 'sending',
    iban: 'XK418826125086208462',
    address: '81614 Dickinson Glens',
    amount: 26079,
    created_at: '2024-09-03T23:44:39.608Z',
  },
  {
    transaction_id: '0191bcc1-e27a-7dd9-b1d3-0f41926f7191',
    account_name: 'Savings Account',
    account_number: '095594292',
    type: 'sending',
    iban: 'XK639664299040040436',
    address: '777 E Jackson Street',
    amount: 1593,
    created_at: '2024-09-03T21:40:35.261Z',
  },
  {
    transaction_id: '0191bcc1-e27a-7dd9-b1d3-10b956cd1951',
    account_name: 'Credit Card Account',
    account_number: '535619556',
    type: 'sending',
    iban: 'XK710460459706064432',
    address: '5562 Arch Alley',
    amount: 43537,
    created_at: '2024-09-04T10:10:11.511Z',
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
