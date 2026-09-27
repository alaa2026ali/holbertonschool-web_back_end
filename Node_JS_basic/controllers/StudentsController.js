import { readDatabase } from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    const databaseFile = process.argv[2];

    readDatabase(databaseFile)
      .then((fields) => {
        let output = 'This is the list of our students';
        const sortedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        for (const field of sortedFields) {
          output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        }
        return response.status(200).send(output);
      })
      .catch(() => {
        return response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    const databaseFile = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase(databaseFile)
      .then((fields) => {
        const list = fields[major] || [];
        return response.status(200).send(`List: ${list.join(', ')}`);
      })
      .catch(() => {
        return response.status(500).send('Cannot load the database');
      });
  }
}
