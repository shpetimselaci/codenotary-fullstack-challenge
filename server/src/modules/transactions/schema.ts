import { ColumnType, Generated, Insertable, Selectable } from 'kysely';

export interface TransactionsTable {
  transaction_id: Generated<string>;
  account_number: string;
  account_name: string;
  type: 'receiving' | 'sending';
  iban: string;
  address: string;
  amount: number;
  created_at: string;
}

export type Transaction = Selectable<TransactionsTable>;
export type NewTransaction = Insertable<TransactionsTable>;
