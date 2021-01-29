(async () => {
  const root = '../../..'
  const { logger } = require('@vtfk/logger')
  const { MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD } = require(root + '/config')
  const mongo = require(root + '/lib/get-mongo')
  const saveFile = require(root + '/lib/save-file')

  // get documents from old db
  const oldDb = await mongo(MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD)

  if (!oldDb) {
    logger('error', [MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD, 'not connected'])
    process.exit(1)
  }

  // Get all yff documents?
  let documents = []
  logger('info', ['yff', '00-fetch', 'henter dokumenter'])
  documents = await oldDb.find({ documentType: 'yff' }).sort({ _id: 1 }).toArray()
  logger('info', ['yff', '00-fetch', 'hentet', documents.length, 'dokumenter'])

  // Save all yff-documents to yff document
  logger('info', ['yff', '00-fetch', 'lagrer', 'yff.json'])
  saveFile({ filePath: `${__dirname}/${root}/data/yff/yff.json`, data: documents })

  // Save types
  const types = ['yff-bekreftelse', 'yff-lokalplan', 'yff-lokalplan-maal', 'yff-tilbakemelding']
  types.forEach(type => {
    logger('info', ['yff', '00-fetch', 'filtrerer type', type])
    const typeDocuments = documents.filter(document => document.documentCategory === type)
    logger('info', ['yff', '00-fetch', 'filtrerer type', type, 'fant', typeDocuments.length])

    logger('info', ['yff', '00-fetch', 'lagrer type', `${type}.json`])
    saveFile({ filePath: `${__dirname}/${root}/data/yff/${type}.json`, data: typeDocuments })
  })

  logger('info', ['yff', '00-fetch', 'ferdig'])
  process.exit(0)
})()
