
(async () => {
  const root = '../../..'
  const { logger } = require('@vtfk/logger')
  const saveFile = require(root + '/lib/save-file')
  const repackBekreftelse = require('./repack-bekreftelse')

  logger('info', ['yff', '01-bekreftelse', 'henter inn bekreftelser'])
  const bekreftelser = require(root + '/data/yff/yff-bekreftelse.json')

  logger('info', ['yff', '01-bekreftelse', `fant ${bekreftelser.length} bekreftelser som skal konverteres`])
  const utplasseringer = bekreftelser.map(bekreftelse => {
    logger('info', ['yff', '01-bekreftelse', 'konverterer bekreftelse', bekreftelse._id])
    return repackBekreftelse(bekreftelse)
  })

  logger('info', ['yff', '01-bekreftelse', `konvertert ${bekreftelser.length} bekreftelser`])

  // Lagre utplasseringer
  logger('info', ['yff', '00-fetch', 'lagrer', 'yff.json'])
  saveFile({ filePath: `${__dirname}/${root}/data/yff/new/utplasseringer.json`, data: utplasseringer })

  logger('info', ['yff', '01-bekreftelse', 'ferdig'])
  process.exit(0)
})()
