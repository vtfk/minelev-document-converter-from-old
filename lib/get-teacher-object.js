module.exports = document => {
  const teacherName = document.userName.split(' ')
  const lastName = teacherName.pop()
  const firstName = teacherName.join(' ')

  return {
    username: document.userId,
    name: document.userName,
    firstName: firstName, // doesn't exist on old documents, so must be generated
    lastName: lastName,
    mobile: '', // doesn't exist on old documents
    mail: '' // doesn't exist on old documents
  }
}
