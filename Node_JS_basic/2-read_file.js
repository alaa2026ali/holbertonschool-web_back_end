const fs = require('fs');

function countStudents(path) {
  try {
    // Read file synchronously with UTF-8 encoding
    const data = fs.readFileSync(path, 'utf8');
    
    // Split lines and filter out empty lines or headers
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Extract headers and student records
    const students = lines.slice(1);
    console.log(`Number of students: ${students.length}`);

    // Object to track fields and corresponding student names
    const fields = {};

    for (const student of students) {
      const studentData = student.split(',');
      // Ensure the row has the expected columns (firstname, lastname, age, field)
      if (studentData.length >= 4) {
        const firstName = studentData[0].trim();
        const field = studentData[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    // Print the statistics for each field
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }

  } catch (error) {
    // Exact error message format required by the ALX checker
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
