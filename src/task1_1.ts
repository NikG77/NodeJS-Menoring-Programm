import os from 'os';
import { reverse } from './utils';

const LineFeed = os.EOL;

process.stdin.on('data', (data) => {
  const result = reverse(data.toString().trim());
  process.stdout.write(`${result}${LineFeed.repeat(3)}`);
});
