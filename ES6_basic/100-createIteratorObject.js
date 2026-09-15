export default function createIteratorObject(report) {
  const employees = [];

  for (const department of Object.values(report.allEmployees)) {
    for (const employee of department) {
      employees.push(employee);
    }
  }

  return employees[Symbol.iterator]();
}
