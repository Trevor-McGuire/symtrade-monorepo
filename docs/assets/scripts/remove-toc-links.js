import { readFileSync, writeFileSync } from 'fs';

function removeTocLinks(filename) {
  const data = readFileSync(filename, 'utf-8');
  const lines = data.split('\n');
  const newLines = lines.filter(
    (line) => !line.includes('[Back to TOC](#table-of-contents)'),
  );
  const newData = newLines.join('\n');
  writeFileSync(filename, newData, 'utf-8');
}

export default removeTocLinks;
