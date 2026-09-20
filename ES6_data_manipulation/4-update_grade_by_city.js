function updateStudentGradeByCity(list, city, newGrades) {
  return list
    .filter((student) => student.location === city)
    .map((student) => {
      const grade = newGrades.find(
        (item) => item.studentId === student.id,
      );

      return {
        ...student,
        grade: grade ? grade.grade : 'N/A',
      };
    });
}

export default updateStudentGradeByCity;
