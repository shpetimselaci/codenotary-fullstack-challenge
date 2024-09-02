export type TransactionsTable = {
  transaction_id: string;
  account_number: string;
  account_name: string;
  type: 'receiving' | 'sending';
  iban: string;
  address: string;
  amount: number;
  created_at: string;
};

export type Transaction = TransactionsTable;
export type NewTransaction = TransactionsTable;
