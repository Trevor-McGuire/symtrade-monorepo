import inquirer from 'inquirer';
import addTocLinks from './add-toc-links.js';
import removeTocLinks from './remove-toc-links.js';
import removeMultiLines from './remove-multi-lines.js';
import replaceRWithN from './replace-r-with-n.js';
import askDepth from './ask-depth.js';
import removeToc from './remove-toc.js';
import addToc from './add-toc.js';
import removeNumberings from './remove-numberings.js';
import addNumberings from './add-numberings.js';

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      'Add TOC links',
      'Remove TOC links',
      'Remove TOC',
      'Add TOC',
      'Remove numberings',
      'Add numberings',
    ],
  },
];

const file = './docs/SDD.md';

inquirer.prompt(questions).then(async (answers) => {
  let depth = 0;
  replaceRWithN(file);
  switch (answers.action) {
    case 'Add TOC links':
      removeTocLinks(file);
      depth = await askDepth(file);
      addTocLinks(file, depth);
      break;
    case 'Remove TOC links':
      removeTocLinks(file);
      break;
    case 'Remove TOC':
      removeToc(file);
      break;
    case 'Add TOC':
      removeToc(file);
      removeNumberings(file);
      addNumberings(file);
      depth = await askDepth(file);
      addToc(file, depth);
      break;
    case 'Remove numberings':
      removeNumberings(file);
      break;
    case 'Add numberings':
      removeNumberings(file);
      addNumberings(file);
      break;
    default:
      console.log('No action selected');
  }
  removeMultiLines(file);
});
