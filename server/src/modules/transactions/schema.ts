export type Transaction = {
  transaction_id: string;
  account_number: string;
  account_name: string;
  type: 'receiving' | 'sending';
  iban: string;
  address: string;
  amount: number;
  created_at: string;
};

export const TRANSACTIONS_COLLECTION_NAME = 'transactions';
