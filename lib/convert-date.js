const pad = num => {
  return num < 10 ? `0${num}` : num
}

const translateMonth = date => {
  return date
    .replace(/mai/g, 'may')
    .replace(/juni/g, 'june')
    .replace(/juli/g, 'july')
    .replace(/oktober/g, 'october')
    .replace(/desember/g, 'december')
}

module.exports = text => {
  if (text === 'NaN. undefined NaN') return false

  const fixedText = translateMonth(text)
  const date = new Date(fixedText)
  return `${pad(date.getDate())}.${pad((date.getMonth() + 1))}.${pad(date.getFullYear())}`
}
