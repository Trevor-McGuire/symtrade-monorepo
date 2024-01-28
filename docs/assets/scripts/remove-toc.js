import { readFileSync, writeFileSync } from 'fs';

function removeToc(filename) {
  const data = readFileSync(filename, 'utf-8');
  const start = data.indexOf('# Table Of Contents');
  const end = data.indexOf('##', start);
  if (start !== -1 && end !== -1) {
    const newData = data.slice(0, start) + data.slice(end);
    writeFileSync(filename, newData, 'utf-8');
  }
}

export default removeToc;
