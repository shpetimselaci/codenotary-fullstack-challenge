import { LoggerOptions, pino } from 'pino';

export const createLogger = (opts: LoggerOptions) =>
  pino({
    transport: {
      target: 'pino-pretty',
    },
    ...opts,
  });
