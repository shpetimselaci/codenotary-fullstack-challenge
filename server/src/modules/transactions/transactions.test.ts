import { TRPC_ERROR_CODES_BY_NUMBER } from '@trpc/server/rpc';
import { isValid } from 'date-fns';
import { expectTypeOf } from 'vitest';
import { t } from '~/setup.test';

import { Transaction } from './schema';
import { addTransactionSchema } from './validation';

describe('Service should allow listing of transactions within the account and should be able to add transactions', () => {
  suite('Add transaction to the account', () => {
    test('Test for Invalid IBAN', async () => {
      const insert = {
        account_name: 'Some name',
        account_number: '123912309120',
        type: 'receiving' as const,
        iban: '1212012345678906',
        address: 'Vushtrri, Kosovo',
        amount: 10000,
      };
      const response = t.client.transactions.add.mutate(insert);
      await expect(response).rejects.toHaveProperty(
        'shape.message',
        JSON.stringify(addTransactionSchema.safeParse(insert).error?.errors, null, '  '),
      );
      await expect(response).rejects.toHaveProperty('data.code', TRPC_ERROR_CODES_BY_NUMBER['-32600']);
    });

    test('Insert transaction', async () => {
      const insert = {
        account_name: 'Somename',
        account_number: '123912309120',
        type: 'receiving' as const,
        iban: 'XK051212012345678906',
        address: 'VushtrriKosovo',
        amount: 10000,
      };
      const response = await t.client.transactions.add.mutate(insert);

      expect(response).contains(insert);
      expect(isValid(response.created_at));
    });

    test('List all transactions of the account', async ({ expect }) => {
      const result = await t.client.transactions.list.query({ limit: 10 });
      expect(result.items.length).toBeGreaterThan(1);
      expectTypeOf(result.items[0]).toEqualTypeOf<Transaction>();
    });
  });
});
