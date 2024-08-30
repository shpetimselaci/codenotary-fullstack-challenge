import { LoggerOptions, pino } from 'pino';
import pinoPretty from 'pino-pretty';

const stream = pinoPretty({
  colorize: true,
});
export const createLogger = (opts: LoggerOptions) => pino(stream);
