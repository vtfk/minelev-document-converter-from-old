(async () => {
  const { MONGODB_COLLECTION_OLD, MONGODB_COLLECTION_NEW, MONGODB_NAME_OLD, MONGODB_NAME_NEW } = require('./config')
  const { logger } = require('@vtfk/logger')
  const mongo = require('./lib/get-mongo')
  const { ObjectId } = require('mongodb')
  const convert = require('./lib/convert-from-old')
  const args = process.argv.slice(2)

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
    const objIdDocuments = args.map(id => ObjectId(id))
    documents = await oldDb.find({ _id: { $in: objIdDocuments } }).sort({ _id: 1 }).toArray()
  } else {
    logger('info', ['index', 'Henter ALLE dokumenter (utenom YFF)'])
    documents = await oldDb.find({ 'documentType': { $ne: 'yff' } }).sort({ _id: 1 }).toArray()
  }

  logger('info', ['index', 'dokumenter hentet', documents.length])

  const converted = await convert(documents)

  const newDb = await mongo(MONGODB_COLLECTION_NEW, MONGODB_NAME_NEW)
  if (!newDb) {
    logger('error', [MONGODB_COLLECTION_NEW, MONGODB_NAME_NEW, 'not connected'])
    process.exit(1)
  }

  try {
    const result = await newDb.insertMany(converted)
    logger('info', ['index', 'dokumenter sendt ut', result.insertedCount])
  } catch (error) {
    logger('error', ['index', 'dokumenter sendt ut', 'error', error])
    console.log(error)
  }

  process.exit(0)
})()
