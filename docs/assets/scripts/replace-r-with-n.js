import { readFileSync, writeFileSync } from 'fs';

function replaceRWithN(filename) {
  let data = readFileSync(filename, 'utf-8');
  while (data.includes('\r\n')) {
    data = data.replace('\r\n', '\n');
  }
  writeFileSync(filename, data, 'utf-8');
}

export default replaceRWithN;
