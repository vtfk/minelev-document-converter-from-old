const { logger } = require('@vtfk/logger')
const pifu = require('./pifu-tools-export.json')
const students = require('./students.json')

module.exports = document => {
  if (document.coursesList === undefined) return undefined

  const student = students.find(stud => stud.ssn === document.studentId || stud.username === document.studentUserName)

  if (!student) {
    logger('error', ['generate-content-classes', 'student not found', document.studentUserName])
  }

  return document.coursesList.split('\n').map(txt => {
    const split = txt.split(' - ')
    const groupSplit = split[0].split(':')
    const school = pifu.find(school => school.schoolId === groupSplit[0])
    const groupId = student && student.undervisningsgruppeIds.find(uid => uid.includes(groupSplit[1])) || false

    if (!groupId) {
      logger('error', ['generate-content-classes', 'student', document.studentUserName, 'groupId not found', groupSplit[1]])
    }

    return {
      id: groupId || `2_${document.studentMainGroupName.split(':')[1]}/${groupSplit[1]}_${school.id}`,
      nb: split[1],
      nn: split[1],
      en: split[1]
    }
  })
}
