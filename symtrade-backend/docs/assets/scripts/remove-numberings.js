import { readFileSync, writeFileSync } from 'fs';

function removeNumberings(filename) {
  const data = readFileSync(filename, 'utf-8');
  const lines = data.split('\n');
  const newLines = lines.map((line) => {
    if (line.startsWith('##')) {
      // Remove the numbering from the heading
      return line.replace(/(#+)\s+\d+(\.\d+)*\s/, '$1 ');
    }
    return line;
  });
  const newData = newLines.join('\n');
  writeFileSync(filename, newData, 'utf-8');
}

export default removeNumberings;
