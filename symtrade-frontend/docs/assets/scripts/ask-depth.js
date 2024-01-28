import inquirer from 'inquirer';
import { readFileSync } from 'fs';

function askDepth(filename) {
  return new Promise((resolve, reject) => {
    const data = readFileSync(filename, 'utf-8');
    const lines = data.split('\n');
    let maxDepth = 0;

    const newLines = lines.map((line) => {
      if (line.startsWith('#')) {
        const depth = line.split(' ')[0].length;
        if (depth > maxDepth) {
          maxDepth = depth;
        }
      }
    });

    const depthArr = Array.from({ length: maxDepth - 1 }, (_, i) => i + 2).map(
      (i) => '#'.repeat(i),
    );

    const questions = [
      {
        type: 'list',
        name: 'action',
        message: 'What depth should this apply up to?',
        choices: depthArr,
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      resolve(answers.action.length - 1);
    });
  });
}

export default askDepth;
