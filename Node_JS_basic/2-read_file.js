const fs = require('fs');

const countStudents = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const students = lines.slice(1);
    console.log(`Number of students: ${students.length}`);

    const fieldCounts = {};

    students.forEach((student) => {
      const details = student.split(',');
      const firstName = details[0];
      const field = details[details.length - 1];

      if (firstName && field) {
        if (!fieldCounts[field]) {
          fieldCounts[field] = [];
        }
        fieldCounts[field].push(firstName);
      }
    });

    for (const [field, names] of Object.entries(fieldCounts)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
