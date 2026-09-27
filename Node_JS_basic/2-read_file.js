const fs = require('fs');

const countStudents = (path) => {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter((line) => line.trim() !== '');
  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  const studentLines = lines.slice(1);
  console.log(`Number of students: ${studentLines.length}`);

  const studentsByField = {};
  const studentCountByField = {};

  studentLines.forEach((line) => {
    const parts = line.split(',');
    if (parts.length >= 4) {
      const firstname = parts[0].trim();
      const field = parts[3].trim();

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstname);
    }
  });

  for (const [field, students] of Object.entries(studentsByField)) {
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  }
};

module.exports = countStudents;
