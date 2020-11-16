import * as Es from '@elastic/elasticsearch';
import { createReadStream } from 'fs';
import split from 'split2';

const client = new Es.Client({
  node: 'http://localhost:9200',
});

const bulkIndex = async () => {
  const result = await client.helpers.bulk({
    datasource: createReadStream('output.ndjson').pipe(split()),
    onDocument() {
      return {
        index: { _index: 'my-test' },
      };
    },
  });
  console.log(result);
};

bulkIndex().catch(console.log);
