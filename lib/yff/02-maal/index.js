(async () => {
  const root = '../../..'
  const { logger } = require('@vtfk/logger')
  const { MONGODB_NAME_NEW, MONGODB_COLLECTION_NEW_YFF } = require(root + '/config')
  const saveFile = require(root + '/lib/save-file')
  const mongo = require(root + '/lib/get-mongo')
  const repackMaal = require('./repack-maal')

  // Last inn gamle bekreftelser og mål
  logger('info', ['yff', '02-maal', 'henter inn utplasseringer'])
  const utplasseringer = require(root + '/data/yff/new/utplasseringer.json')

  logger('info', ['yff', '02-maal', 'henter inn mål'])
  const gamleMaal = require(root + '/data/yff/yff-lokalplan-maal.json')

  // Repack opplegget
  logger('info', ['yff', '02-maal', `fant ${gamleMaal.length} mål som skal konverteres`])
  const nyeMaal = gamleMaal.map(maal => {
    logger('info', ['yff', '02-maal', maal._id, 'konverterer mål'])

    const utplassering = utplasseringer.find(utplassering => utplassering.old._id === maal.utplasseringID)
    logger('info', ['yff', '02-maal', maal._id, utplassering ? ('fant utplassering', utplassering._id) : 'fant ikke utplassering'])

    return repackMaal(maal, utplassering)
  })
  logger('info', ['yff', '02-maal', `konvertert ${nyeMaal.length} mål`])

  // Koble til og dytt mål til databasen
  logger('info', ['yff', '02-maal', 'kobler til mongo', MONGODB_NAME_NEW, MONGODB_COLLECTION_NEW_YFF])
  const db = await mongo(MONGODB_COLLECTION_NEW_YFF, MONGODB_NAME_NEW)

  logger('info', ['yff', '02-maal', 'lagrer mål til mongo'])
  const result = await db.insertMany(nyeMaal)
  logger('info', ['yff', '02-maal', 'lagret mål til mongo', result.insertedCount])

  // Lagre mål m/_id til fil
  logger('info', ['yff', '02-maal', 'lagrer', 'maal.json'])
  saveFile({ filePath: `${__dirname}/${root}/data/yff/new/maal.json`, data: result.ops })

  logger('info', ['yff', '02-maal', 'ferdig'])
  process.exit(0)
})()
