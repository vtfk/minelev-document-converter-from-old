const pad = num => {
  return num < 10 ? `0${num}` : num
}

module.exports = text => {
  const date = new Date(text)
  return `${pad(date.getDate())}.${pad((date.getMonth() + 1))}.${pad(date.getFullYear())}`
}
