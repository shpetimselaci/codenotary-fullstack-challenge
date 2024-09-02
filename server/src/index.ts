import { config } from './config';
import { startServer } from './server';

void startServer(Number(process.argv.slice(2)[0]) || config.PORT);
