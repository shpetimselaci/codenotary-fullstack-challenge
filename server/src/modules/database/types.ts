import { ColumnType, Generated, Insertable, Selectable } from 'kysely';

export interface TransactionsTable {
  account_number: Generated<number>;
  account_name: string;
  type: 'receiving' | 'sending';
  iban: string;
  address: string;
  amount: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Transaction = Selectable<TransactionsTable>;
export type NewTransaction = Insertable<TransactionsTable>;
