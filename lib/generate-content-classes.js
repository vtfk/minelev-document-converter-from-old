module.exports = text => {
  if (text === undefined) return undefined
  
  return text.split('\n').map(txt => {
    const split = txt.split(' - ')
    const groupSplit = split[0].split(':')
    return {
      // 2_TEST/201ENG1001_KRAVS@38022 (new)
      // SKOVS:2KJTB/ENG1003 - Engelsk (old)
      id: `${groupSplit[1]}_${groupSplit[0]}@`, // where comes this number from?
      nb: split[1],
      nn: split[1],
      en: split[1]
    }
  })
}
