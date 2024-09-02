import { RUNTIME_LOGGER } from '~/loggers/server';

const dataTypes = {
  25: String,
  20: Number,
  2950: String,
} as const;

const columnNameExtractorRegex = new RegExp(/\(.*\.(.*)\)/gm);

interface Result {
  command: 'ok';
  rows: Record<string, string>[];
  fields: {
    name: string;
    tableID: number;
    columnID: number;
    dataTypeID: number;
    dataTypeSize: number;
    dataTypeModifier: number;
    format: string;
  }[];
}
export function unWrapRows<T extends Record<string, string | number | boolean>>(result: Result): T[] {
  if (!Array.isArray(result.fields)) {
    throw Error('Cannot unwrap result from query');
  }

  let fields = result.fields.reduce(
    (acc, item) => {
      let typeConstructor = dataTypes[item.dataTypeID as keyof typeof dataTypes];
      if (!typeConstructor) {
        RUNTIME_LOGGER.warn('Type not found. Falling back to string');
        typeConstructor = dataTypes[25];
      }
      acc[item.name] = typeConstructor;
      return acc;
    },
    {} as Record<string, StringConstructor | NumberConstructor>,
  );

  return result.rows.map((row) =>
    Object.keys(row).reduce(
      (acc, key) => {
        const val = row[key];
        const castedValue = fields[key](val);
        const extractedColumnName = key.replace(columnNameExtractorRegex, '$1');

        acc[extractedColumnName] = castedValue;

        return acc;
      },
      {} as Record<string, (typeof dataTypes)[keyof typeof dataTypes]['prototype']>,
    ),
  ) as T[];
}
