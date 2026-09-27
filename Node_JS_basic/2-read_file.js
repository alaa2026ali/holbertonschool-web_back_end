تفضل كود الملف 2-read_file.js المتوافق تماماً مع اختبارات الـ Checker وبدون أي تعليقات:
## 2-read_file.js

const fs = require('fs');
function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const students = lines.slice(1);
    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);

    const fields = {};

    for (const student of students) {
      const studentData = student.split(',');
      if (studentData.length >= 4) {
        const firstName = studentData[0].trim();
        const field = studentData[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    for (const [field, list] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

هل تحتاج إلى كود التاسك القادم أو ترغب في تعديل أي جزء هنا؟

