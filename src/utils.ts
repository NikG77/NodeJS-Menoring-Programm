import { Transform } from 'stream';
import os from 'os';

export const stringStream = () =>
  new Transform({
    transform(chunk, encoding, callback) {
      const { ['Amount']: remove, ...rest } = JSON.parse(chunk.toString());
      callback(null, Buffer.from(JSON.stringify(rest) + os.EOL));
    },
  });

export const reverse = (value: string): string => {
  return value.split('').reverse().join('');
};
