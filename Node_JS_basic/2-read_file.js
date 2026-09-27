const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);

    const fields = {};

    for (const student of students) {
      const columns = student.split(',');
      const firstName = columns[0];
      const field = columns[3];

      if (!fields[field]) {
        fields[field] = [];
      }

      fields[field].push(firstName);
    }

    for (const field in fields) {
      console.log(
        `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
      );
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
