module.exports = document => {
  const createdDate = new Date(document.timeStamp)
  const month = (createdDate.getMonth() + 1)
  if (month >= 8 && month <= 12) return `${createdDate.getFullYear()}/${(createdDate.getFullYear() + 1)}`
  else if (month >= 1 && month <= 7) return `${(createdDate.getFullYear() - 1)}/${createdDate.getFullYear()}`
  else return ''
}
