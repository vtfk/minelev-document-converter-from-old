(async () => {
  const root = '../../..'
  const { logger } = require('@vtfk/logger')
  const { MONGODB_NAME_NEW, MONGODB_COLLECTION_NEW_YFF } = require(root + '/config')
  const saveFile = require(root + '/lib/save-file')
  const mongo = require(root + '/lib/get-mongo')
  const repackBekreftelse = require('./repack-bekreftelse')

  // Last inn gamle bekreftelser
  logger('info', ['yff', '01-bekreftelse', 'henter inn bekreftelser'])
  const bekreftelser = require(root + '/data/yff/yff-bekreftelse.json')

  // Repack opplegget
  logger('info', ['yff', '01-bekreftelse', `fant ${bekreftelser.length} bekreftelser som skal konverteres`])
  const utplasseringer = bekreftelser.map(bekreftelse => {
    logger('info', ['yff', '01-bekreftelse', 'konverterer bekreftelse', bekreftelse._id])
    return repackBekreftelse(bekreftelse)
  })
  logger('info', ['yff', '01-bekreftelse', `konvertert ${bekreftelser.length} bekreftelser`])

  // Koble til og dytt utplasseringer til databasen
  logger('info', ['yff', '01-bekreftelse', 'kobler til mongo', MONGODB_NAME_NEW, MONGODB_COLLECTION_NEW_YFF])
  const db = await mongo(MONGODB_COLLECTION_NEW_YFF, MONGODB_NAME_NEW)

  logger('info', ['yff', '01-bekreftelse', 'lagrer utplasseringer til mongo'])
  const result = await db.insertMany(utplasseringer)
  logger('info', ['yff', '01-bekreftelse', 'lagret utplasseringer til mongo', result.insertedCount])

  // Lagre utplasseringer m/_id til fil
  logger('info', ['yff', '01-bekreftelse', 'lagrer', 'utplasseringer.json'])
  saveFile({ filePath: `${__dirname}/${root}/data/yff/new/utplasseringer.json`, data: result.ops })

  logger('info', ['yff', '01-bekreftelse', 'ferdig'])
  process.exit(0)
})()
