import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
      return;
    }

    const lines = data
      .split('\n')
      .filter((line) => line.trim() !== '');

    const result = {};

    for (let i = 1; i < lines.length; i += 1) {
      const student = lines[i].split(',');
      const firstname = student[0];
      const field = student[3];

      if (!result[field]) {
        result[field] = [];
      }

      result[field].push(firstname);
    }

    resolve(result);
  });
});

export default readDatabase;
