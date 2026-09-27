const fs = require('fs');

const countStudents = (filePath) => {
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  // Handle both LF (\n) and CRLF (\r\n) line endings, and filter out empty lines
  const lines = fileContent
    .toString()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '');

  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  // Remove header
  const studentRows = lines.slice(1);
  console.log(`Number of students: ${studentRows.length}`);

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

  for (const [field, students] of Object.entries(fields)) {
    console.log(
      `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`
    );
  }
};

module.exports = countStudents;
