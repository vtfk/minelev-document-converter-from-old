(async () => {
  const { logger } = require('@vtfk/logger')
  const mongo = require('./lib/get-mongo')

  // get documents from old db
  const oldDb = await mongo('documents', 'minelev-dev')

  if (!oldDb) {
    logger('error', [MONGODB_COLLECTION_OLD, MONGODB_NAME_OLD, 'not connected'])
    process.exit(1)
  }
  
  const result = await oldDb.deleteMany({})

  logger('info', ['prepare', 'dokumenter slettet', result.deletedCount])
  
  process.exit(0)
})()
