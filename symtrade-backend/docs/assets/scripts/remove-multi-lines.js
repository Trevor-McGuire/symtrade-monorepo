import { readFileSync, writeFileSync } from 'fs';

function removeMultiLines(filename) {
  let data = readFileSync(filename, 'utf-8');
  while (data.includes('\n\n\n')) {
    data = data.replace('\n\n\n', '\n\n');
  }

  writeFileSync(filename, data, 'utf-8');
}

export default removeMultiLines;
