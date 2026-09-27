const express = require('express');
const fs = require('fs');

const app = express();
const DATABASE_FILE = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

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

      let output = `Number of students: ${totalStudents}`;
      for (const [field, students] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
      }
      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(DATABASE_FILE)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245);

module.exports = app;
