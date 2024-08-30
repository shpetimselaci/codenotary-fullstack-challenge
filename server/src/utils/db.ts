import { InsertObject } from 'kysely';
import { Database } from '~/sdk/kesley';

export function getInsertStringified<T extends InsertObject<Database, keyof Database>>(inserts: T) {
  const cols = Object.keys(inserts) as (keyof typeof inserts)[];

  return {
    columns: cols.join(', '),
    values: cols.reduce((acc, col, index, arr) => {
      let dot = `${index == arr.length - 1 ? '' : ', '}`;
      if (typeof inserts[col] === 'string') {
        acc += `'${inserts[col]}'${dot}`;
      } else {
        acc += `${inserts[col]}${dot}`;
      }
      return acc;
    }, ''),
  };
}
