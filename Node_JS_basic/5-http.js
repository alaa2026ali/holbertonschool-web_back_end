const http = require('http');
const fs = require('fs');

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

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    try {
      const students = await countStudents(database);
      res.end(`This is the list of our students\n${students}\n`);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.end('Hello Holberton School!\n');
  }
});

app.listen(1245);

module.exports = app;
