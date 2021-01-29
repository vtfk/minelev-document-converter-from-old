const oldStatus = {
  'Sendt til elevmappa': 'archived',
  'Sendt via SvarUT': 'sent',
  'Sendt via SvarUt': 'sent',
  Arkivert: 'archived',
  'I kø': 'queued'
}

module.exports = status => oldStatus[status]
