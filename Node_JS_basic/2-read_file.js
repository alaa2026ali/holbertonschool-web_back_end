const fs = require('fs');

const countStudents = (dataPath) => {
  try {
    // Read the file synchronously with utf8 encoding
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // Split lines and filter out empty lines
    const lines = fileContent
      .toString()
      .split('\n')
      .filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Remove the header line
    const studentLines = lines.slice(1);
    console.log(`Number of students: ${studentLines.length}`);

    const fields = {};

    studentLines.forEach((line) => {
      const studentRecord = line.split(',');
      if (studentRecord.length >= 4) {
        const firstName = studentRecord[0].trim();
        const field = studentRecord[3].trim();

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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
