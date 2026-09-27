import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const database = await readDatabase(process.argv[2]);

      let response = 'This is the list of our students\n';

      const fields = Object.keys(database).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase()),
      );

      fields.forEach((field, index) => {
        response += `Number of students in ${field}: ${database[field].length}. List: ${database[field].join(', ')}`;

        if (index < fields.length - 1) {
          response += '\n';
        }
      });

      res.status(200).send(response);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const database = await readDatabase(process.argv[2]);

      res.status(200).send(`List: ${database[major].join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
