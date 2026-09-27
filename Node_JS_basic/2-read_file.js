const fs = require('fs');

const countStudents = (filePath) => {
  let fileContent;
  try {
    // Attempt to read the file synchronously
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    // If the file cannot be found or read, throw the exact required error
    throw new Error('Cannot load the database');
  }

  // Split lines and filter out any empty lines (including trailing ones)
  const lines = fileContent
    .split('\n')
    .filter((line) => line.trim() !== '');

  // If there are no students (only header or empty file)
  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  // Extract student records (skipping the header line at index 0)
  const studentRows = lines.slice(1);
  console.log(`Number of students: ${studentRows.length}`);

  const fields = {};

  studentRows.forEach((row) => {
    const student = row.split(',');
    if (student.length >= 4) {
      const firstName = student[0].trim();
      const field = student[3].trim();

      if (firstName && field) {
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }
  });

  // Print results grouped by field
  for (const [field, students] of Object.entries(fields)) {
    console.log(
      `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`
    );
  }
};

module.exports = countStudents;
