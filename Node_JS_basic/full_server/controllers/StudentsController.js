import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(request, response) {
    const database = process.argv[2];

    try {
      const students = await readDatabase(database);

      let result = 'This is the list of our students\n';

      const fields = Object.keys(students).sort((a, b) => (
        a.toLowerCase().localeCompare(b.toLowerCase())
      ));

      fields.forEach((field) => {
        result += `Number of students in ${field}: `;
        result += `${students[field].length}. `;
        result += `List: ${students[field].join(', ')}\n`;
      });

      return response.status(200).send(result.trim());
    } catch (error) {
      return response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response
        .status(500)
        .send('Major parameter must be CS or SWE');
    }

    const database = process.argv[2];

    try {
      const students = await readDatabase(database);

      return response
        .status(200)
        .send(`List: ${students[major].join(', ')}`);
    } catch (error) {
      return response.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
