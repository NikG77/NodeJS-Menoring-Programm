import { pipeline, Transform } from 'stream';
import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import { stringStream } from './utils';

const csvFilePath = path.join(process.cwd(), 'src/csv', 'task1_2.csv');

pipeline(
  fs.createReadStream(csvFilePath),
  csv(),
  stringStream(),
  fs.createWriteStream(path.join(process.cwd(), 'src/csv', 'task1_2.txt')),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  },
);
