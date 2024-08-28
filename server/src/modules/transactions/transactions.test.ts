import { t } from '~/setup.test';

describe('Service should allow listing of transactions within the account and should be able to add transactions', async () => {
  test('List all transactions of the account', async ({ expect }) => {
    expect(await t.client.transactions.list.query({ limit: 10 })).toEqual([]);
  });
  test('Add transaction to the account', () => {});
});
