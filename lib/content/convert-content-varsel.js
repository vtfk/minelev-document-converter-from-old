const generateYear = require('../generate-year')
const generateReasons = require('../generate-content-reasons')
const generateClasses = require('../generate-content-classes')
const documentStatuses = require('../documents')

module.exports = (document, type) => {
  let reasons
  if (type === 'fag') reasons = generateReasons(document.gradesCategories, type)
  else if (type === 'atferd') reasons = generateReasons(document.behaviourCategories, type)
  else if (type === 'orden') reasons = generateReasons(document.orderCategories, type)
  else reasons = []

  const period = documentStatuses.periods.find(period => period.value.nb === document.period)

  return {
    year: generateYear(document),
    reasons,
    period: {
      id: period.id,
      ...period.value
    },
    classes: (['fag'].includes(type) ? generateClasses(document.coursesList) : undefined)
  }
}