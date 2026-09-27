import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        if (lines.length <= 1) {
          resolve({});
          return;
        }

        const studentRows = lines.slice(1);
        const fields = {};

        studentRows.forEach((row) => {
          const student = row.split(',');
          if (student.length >= 4) {
            const firstName = student[0].trim();
            const field = student[3].trim();

            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstName);
          }
        });

        resolve(fields);
      }
    });
  });
};

export default readDatabase;
