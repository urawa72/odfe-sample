import * as Es from '@elastic/elasticsearch';
import { DateTime } from 'luxon';

const client = new Es.Client({
  node: 'http://localhost:9200',
});

const createIndex = async (): Promise<void> => {
  console.log('Create Index');
  await client.indices.create({
    index: 'my-test',
    body: {
      mappings: {
        properties: {
          id: {
            type: 'integer',
          },
          temperature: {
            type: 'integer',
          },
          timestamp: {
            type: 'date',
          },
        },
      },
    },
  });
};

const createDoc = async () => {
  const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
  let idx = 0;
  const loop = true;
  while (loop) {
    idx++;
    const temp = Math.round((Math.random() * (35 - 10) + 10) * 100) / 100;
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

const checkExists = async () => {
  return await client.indices.exists({
    index: 'my-test',
  });
};

checkExists()
  .then((r) => {
    if (!r.body) {
      createIndex().catch(console.log);
    }
  })
  .catch(console.log);
createDoc().catch(console.log);
