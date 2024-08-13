/**
 * returns an array of objects who are located in a specific city.
 *
 *
 */

export default function getStudentsByLocation(students, city) {
  if (students instanceof Array) {
    return students.filter((student) => student.location === city);
  }
  return [];
}
