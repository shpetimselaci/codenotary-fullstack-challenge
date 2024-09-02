import { TRPC_ERROR_CODES_BY_NUMBER } from '@trpc/server/rpc';
import { t } from '~/setup.test';
import { addTransactionSchema } from './validation';
import { isValid } from 'date-fns';
import { string } from 'zod';
import { Transaction } from './schema';
import { expectTypeOf } from 'vitest';

describe('Service should allow listing of transactions within the account and should be able to add transactions', async () => {
  suite('Add transaction to the account', () => {
    test('Test for Invalid IBAN', async () => {
      const insert = {
        account_name: 'Some name',
        account_number: '123912309120',
        type: 'receiving' as 'receiving',
        iban: '1212012345678906',
        address: 'Vushtrri, Kosovo',
        amount: 10000,
      };
      const response = await t.client.transactions.add.mutate(insert).catch((error) => error);
      expect(JSON.parse(response.shape.message)).toStrictEqual(addTransactionSchema.safeParse(insert).error?.errors);
      expect(response.data.code).toStrictEqual(TRPC_ERROR_CODES_BY_NUMBER['-32600']);
    });

    test('Insert transaction', async () => {
      const insert = {
        account_name: 'Somename',
        account_number: '123912309120',
        type: 'receiving' as 'receiving',
        iban: 'XK051212012345678906',
        address: 'VushtrriKosovo',
        amount: 10000,
      };
      const response = await t.client.transactions.add.mutate(insert);

      expect(response).contains(insert);
      expect(isValid(response.created_at));
      expect(string().uuid().safeParse(response.transaction_id).success).toBe(true);
    });

    test('List all transactions of the account', async ({ expect }) => {
      const result = await t.client.transactions.list.query({ limit: 10 });
      expect(result.length).toBeGreaterThan(1);
      expectTypeOf(result[0]).toEqualTypeOf<Transaction>();
    });
  });
});
