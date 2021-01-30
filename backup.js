(async () => {
  const { MONGODB_COLLECTION_OLD, MONGODB_COLLECTION_NEW, MONGODB_NAME_OLD, MONGODB_NAME_NEW } = require('./config')
  const { logger } = require('@vtfk/logger')
  const mongo = require('./lib/get-mongo')
  const args = process.argv.slice(2)
  const saveFile = require('./lib/save-file')

  // get documents from old db
  const oldDb = await mongo(MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD)

  if (!oldDb) {
    logger('error', [MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD, 'not connected'])
    process.exit(1)
  }

  // Get all documents? Or just the ones given on cli
  let documents = []
  if (args.length > 0) {
    logger('info', ['index', "Henter angitte dokument id'er", args.length])
    documents = await oldDb.find({ _id: { $in: args } }).sort({ _id: 1 }).toArray()
  } else {
    logger('info', ['index', 'Henter ALLE dokumenter'])
    documents = await oldDb.find({}).sort({ _id: 1 }).toArray()
  }

  logger('info', ['index', 'dokumenter', documents.length])

  documents.forEach(document => saveFile({ filePath: `${__dirname}/test/backup/${document._id}.json`, data: document }))
  
  process.exit(0)
})()
