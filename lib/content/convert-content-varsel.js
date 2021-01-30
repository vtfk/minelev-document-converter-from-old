const generateYear = require('../generate-year')
const generateReasons = require('../generate-content-reasons')
const generateClasses = require('../generate-content-classes')
const documentStatuses = require('../../data/documents')

module.exports = (document, type) => {
  let reasons
  if (type === 'fag') reasons = generateReasons(document.gradesCategories, type)
  else if (type === 'atferd') reasons = generateReasons(document.behaviourCategories, type)
  else if (type === 'orden') reasons = generateReasons(document.orderCategories, type)
  else reasons = []

  const period = documentStatuses.periods.find(period => period.value.nb === document.period)
  const content = {
    year: generateYear(document),
    reasons,
    period: {
      id: period.id,
      ...period.value
    }
  }

  if (['fag'].includes(type)) content.classes = generateClasses(document)

  return content
}
