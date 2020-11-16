import fs from 'fs';
import { DateTime } from 'luxon';

const output = fs.createWriteStream('output.ndjson', 'utf8');

let date = DateTime.local().minus({ hours: 5 });
for (let i = 1; i <= 18000; i++) {
  date = date.plus(1000);
  const param = {
    sequence: i,
    value: Math.round((Math.random() * (35 - 20) + 20) * 10000) / 10000,
    timestamp: date.toISO(),
  };
  output.write(JSON.stringify(param) + '\n');
}
