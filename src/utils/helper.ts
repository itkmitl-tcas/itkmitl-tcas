export function createMappingPayload(data) {
  const mapStudent = data.students.map((student) => student.apply_id).join(',');
  const mapTeacher = data.teacher[0].apply_id;

  return { student_id: mapStudent, teacher_id: `${mapTeacher}` };
}
