const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, content) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = content
        .split('\n')
        .filter((line) => line.trim() !== '');

      const headers = lines[0].split(',');
      const fieldIndex = headers.indexOf('field');
      const firstNameIndex = headers.indexOf('firstname');

      const fields = {};
      let totalStudents = 0;

      for (let i = 1; i < lines.length; i += 1) {
        const studentData = lines[i].split(',');

        if (studentData.length === headers.length) {
          const field = studentData[fieldIndex].trim();
          const firstName = studentData[firstNameIndex].trim();

          if (!fields[field]) {
            fields[field] = [];
          }

          fields[field].push(firstName);
          totalStudents += 1;
        }
      }

      let result = `Number of students: ${totalStudents}\n`;

      for (const [field, students] of Object.entries(fields)) {
        result += `Number of students in ${field}: ${students.length}. `;
        result += `List: ${students.join(', ')}\n`;
      }

      resolve(result.trim());
    });
  });
}

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const students = await countStudents(database);

    res.type('text').send(
      `This is the list of our students\n${students}`,
    );
  } catch (error) {
    res.type('text').send(error.message);
  }
});

app.listen(1245);

module.exports = app;
