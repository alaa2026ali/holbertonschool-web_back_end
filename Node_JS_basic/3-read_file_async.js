const fs = require('fs');

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

      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
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

      console.log(`Number of students: ${totalStudents}`);

      for (const [field, students] of Object.entries(fields)) {
        console.log(
          `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
        );
      }

      resolve();
    });
  });
}

module.exports = countStudents;
