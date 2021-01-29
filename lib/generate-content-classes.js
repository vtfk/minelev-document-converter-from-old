const pifu = require('./pifu-tools-export.json')

module.exports = text => {
  if (text === undefined) return undefined

  return text.split('\n').map(txt => {
    const split = txt.split(' - ')
    const groupSplit = split[0].split(':')
    const school = pifu.find(school => school.schoolId === groupSplit[0])

    return {
      id: `${groupSplit[1]}_${school.id}`,
      nb: split[1],
      nn: split[1],
      en: split[1]
    }
  })
}
