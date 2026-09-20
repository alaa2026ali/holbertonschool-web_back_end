function getStudentIdsSum(list) {
  return list.reduce((sum, student) => sum + student.id, 0);
}

export default getStudentIdsSum;
