import { readFileSync, writeFileSync } from 'fs';

function addTocLinks(filename, depth) {
  console.log('depth', depth);
  const data = readFileSync(filename, 'utf-8');
  const lines = data.split('\n');
  const newLines = lines.map((line) => {
    for (let i = 1; i <= depth; i++) {
      const heading = '#'.repeat(i + 1) + ' ';
      if (line.startsWith(heading)) {
        return line + '\n\n[Back to TOC](#table-of-contents)\n\n';
      }
    }
    return line;
  });
  const newData = newLines.join('\n');
  writeFileSync(filename, newData, 'utf-8');
}

export default addTocLinks;
