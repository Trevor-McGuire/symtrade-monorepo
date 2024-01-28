import { readFileSync, writeFileSync } from 'fs';

function addToc(filename, depth) {
  const data = readFileSync(filename, 'utf-8');
  const lines = data.split('\n');
  const title = lines[0];
  const header = '# Table Of Contents';
  const toc = generateToc(lines, depth);
  const body = lines.slice(1).join('\n');
  const newData = `${title}\n\n${header}\n\n${toc}\n\n${body}`;
  writeFileSync(filename, newData, 'utf-8');

  function generateToc(lines, depth) {
    depth++;
    const headings = lines.filter((line) => line.startsWith('##'));
    const toc = headings
      .map((heading) => {
        const level = heading.indexOf(' ');
        if (level > depth) {
          return '';
        }
        const text = heading.slice(level + 1);
        const link = text.toLowerCase().replace(/ /g, '-');
        return `${'  '.repeat(level - 2)}- [${text}](#${link})`;
      })
      .filter((line) => line !== '');
    return toc.join('\n');
  }
}

export default addToc;
