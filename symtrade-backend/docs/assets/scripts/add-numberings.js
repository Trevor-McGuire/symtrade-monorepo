import { readFileSync, writeFileSync } from 'fs';

function addNumberings(filename) {
  const data = readFileSync(filename, 'utf-8');
  const lines = data.split('\n');
  let numbering = [];
  const newLines = lines.map((line) => {
    if (line.startsWith('##')) {
      const depth = line.split(' ')[0].length - 1;
      if (depth < numbering.length) {
        numbering = numbering.slice(0, depth);
      }
      if (numbering.length < depth) {
        numbering.push(0);
      }
      numbering[numbering.length - 1]++;
      line = line.replace(/(#+)\s/, `$1 ${numbering.join('.')} `);
    }
    return line;
  });
  const newData = newLines.join('\n');
  writeFileSync(filename, newData, 'utf-8');
}

export default addNumberings;
