import dotenv from 'dotenv';

import { build } from './build';

dotenv.config();
build().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
