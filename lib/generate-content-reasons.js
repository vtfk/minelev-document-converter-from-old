const documentStatuses = require('../data/documents')

module.exports = (text, type) => {
  const obj = []

  text.split('\n').forEach(t => {
    let reasonObj
    if (type === 'fag') reasonObj = documentStatuses.courseReasons.find(reason => reason.value.nb === t)
    else if (type === 'atferd') reasonObj = documentStatuses.behaviourReasons.find(reason => reason.value.nb === t)
    else if (type === 'orden') reasonObj = documentStatuses.orderReasons.find(reason => reason.value.nb === t)

    if (Object.keys(reasonObj)) {
      obj.push({
        id: reasonObj.id,
        ...reasonObj.value
      })
    }
  })

  return obj
}
