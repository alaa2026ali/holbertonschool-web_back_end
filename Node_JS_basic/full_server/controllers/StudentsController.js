import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(request, response) {
    const databaseFile = process.argv[2];
    try {
      const studentsByField = await readDatabase(databaseFile);
      let responseText = 'This is the list of our students';

      // Sort fields alphabetically case-insensitive
      const sortedFields = Object.keys(studentsByField).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      sortedFields.forEach((field) => {
        const list = studentsByField[field].join(', ');
        responseText += `\nNumber of students in ${field}: ${studentsByField[field].length}. List: ${list}`;
      });

      response.status(200).send(responseText);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const databaseFile = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const studentsByField = await readDatabase(databaseFile);
      const students = studentsByField[major] || [];
      response.status(200).send(`List: ${students.join(', ')}`);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
