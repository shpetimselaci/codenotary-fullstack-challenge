import * as faker from '@faker-js/faker';
import { v7 as uuid } from 'uuid';

import type { MigrationFn } from '../migrator';

export const up: MigrationFn = async (params) => {
  const {
    context: { queryBuilder },
  } = params;

  const items = new Array(10).fill(undefined).map(() => ({
    transaction_id: uuid(),
    account_name: faker.fakerEN_US.finance.accountName(),
    account_number: faker.fakerEN_US.finance.accountNumber(),
    type: Math.random() > 0.5 ? 'receiving' : 'sending',
    iban: faker.fakerEN_US.finance.iban(),
    address: faker.fakerEN_US.location.streetAddress(),
    amount: faker.fakerEN_US.finance.amount({ min: 10, max: 100000, dec: 0 }),
    created_at: faker.fakerEN_US.date.recent(),
  }));

  const query = queryBuilder.table('transactions').insert(items).toQuery();

  return queryBuilder.raw(query);
};

export const down: MigrationFn = async ({ context: { queryBuilder } }) => {
  const query = queryBuilder.schema.dropTable('transactions');
  await queryBuilder.raw(query.toQuery());
  return queryBuilder.raw(
    `create table if not exists transactions (
      transaction_id UUID,
      account_number varchar,
      account_name varchar,
      type varchar[9],
      iban varchar,
      address varchar[255],
      created_at varchar[255],
      amount integer,
      primary key transaction_id
    );`,
  ); // clean slate? :P
};
