import { RUNTIME_LOGGER } from '~/loggers/server';
import { Result } from '~/sdk/knex';

const dataTypes = {
  '25': String,
  '20': Number,
  '2950': String,
} as const;

type DataTypeIds = string;
type DataTypeConstructors = (typeof dataTypes)[keyof typeof dataTypes];

const mapDataTypes = new Map<DataTypeIds, DataTypeConstructors>(
  Object.entries(dataTypes) as Array<[DataTypeIds, DataTypeConstructors]>,
);
const columnNameExtractorRegex = new RegExp(/\(.*\.(.*)\)/gm);

export function unWrapRows<T extends Record<string, string | number | boolean>>(result: Result): Array<T> {
  if (!Array.isArray(result.fields)) {
    throw Error('Cannot unwrap result from query');
  }
  const fields = result.fields.reduce<Record<string, StringConstructor | NumberConstructor>>((acc, item) => {
    let typeConstructor = mapDataTypes.get(String(item.dataTypeID));
    if (!typeConstructor) {
      RUNTIME_LOGGER.warn('Type not found. Falling back to string');
      typeConstructor = dataTypes[25];
    }
    acc[item.name] = typeConstructor;
    return acc;
  }, {});

  return result.rows.map((row) =>
    Object.keys(row).reduce<Record<string, (typeof dataTypes)[keyof typeof dataTypes]['prototype']>>((acc, key) => {
      const val = row[key];
      const castedValue = fields[key](val);
      const extractedColumnName = key.replace(columnNameExtractorRegex, '$1');

      acc[extractedColumnName] = castedValue;

      return acc;
    }, {}),
  ) as Array<T>;
}
