(async () => {
  const { MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD } = require('./config')
  const { logger } = require('@vtfk/logger')
  const mongo = require('./lib/get-mongo')

  // get documents from old db
  const oldDb = await mongo(MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD)

  if (!oldDb) {
    logger('error', [MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD, 'not connected'])
    process.exit(1)
  }

  // put your document here
  const document = {}

  const result = await oldDb.insertOne(document)
  logger('info', ['index', 'dokumenter sendt ut', result.insertedCount])

  process.exit(0)
})()
