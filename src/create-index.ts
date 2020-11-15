import * as Es from '@elastic/elasticsearch';
import { DateTime } from 'luxon';

const client = new Es.Client({
  node: 'http://localhost:9200',
});

const createDoc = async () => {
  const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const loop = true;
  let idx = 0;
  while (loop) {
    ++idx;
    let temp = Math.round((Math.random() * (35 - 20) + 20) * 10000) / 10000;
    if (idx % 100 === 0) temp = 100;
    const param = {
      id: idx,
      temperature: temp,
      timestamp: DateTime.local().toISO(),
    };
    console.log('Create Doc:', JSON.stringify(param));
    await client.index({
      index: 'my-test',
      body: param,
    });
    await sleep();
  }
};

createDoc().catch(console.log);
