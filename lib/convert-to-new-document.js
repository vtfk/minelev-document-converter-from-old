const getSchools = require('vtfk-schools-info')
const getTeacher = require('./get-teacher-object')
const repackDocumentStatus = require('./repack-document-status')

module.exports = document => {
  const school = getSchools({ shortName: document.schoolId })

  return {
    _id: document._id,
    created: {
      timestamp: document.timeStamp,
      createdBy: document.userId
    },
    modified: [
      {
        timestamp: document.timeStamp,
        modifiedBy: document.userId
      }
    ],
    type: document.documentType,
    variant: (document.samtaleCategories === 'Eleven ønsker ikke samtale' ? 'ikke-samtale' : document.documentCategory),
    student: {
      username: document.studentUserName,
      name: document.studentName,
      firstName: document.studentFirstName,
      lastName: document.studentLastName,
      personalIdNumber: document.studentId,
      mobile: document.studentPhone || '',
      mail: document.studentMail || `${document.studentUserName}@skole.vtfk.no`,
      classId: document.studentMainGroupName,
      level: document.classLevel
    },
    content: {},
    teacher: getTeacher(document),
    school: {
      id: document.schoolId,
      name: document.schoolName,
      shortName: (school && school.length > 0 ? school[0].name : '')
    },
    isEncrypted: document.documentType === 'notat', // this doesn't exist in the old document schems?!
    status: document.documentStatus.map(({ status, timeStamp }) => {
      return {
        status: repackDocumentStatus(status),
        timestamp: timeStamp
      }
    }),
    isQueued: document.isQueued
  }
}
