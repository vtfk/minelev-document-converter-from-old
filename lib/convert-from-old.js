const { logger } = require('@vtfk/logger')
const toNewDocument = require('./convert-to-new-document')
//const saveFile = require('./save-file')

module.exports = documents => {
  return new Promise((resolve) => {
    let index = 1
    const converted = documents.map(document => {
      try {
        logger('info', ['convert-from-old', `${index} / ${documents.length}`, document._id])
        //saveFile({ filePath: `${__dirname}/../test/old/${document._id}.json`, data: document })
        let newDocument = toNewDocument(document)
        logger('info', ['convert-from-old', document._id, 'converted'])
        const type = (['samtale', 'varsel', 'notat'].includes(newDocument.type) ? newDocument.type : `${newDocument.type}-${newDocument.variant}`)
        logger('info', ['convert-from-old', document._id, type, 'adding specific properties'])
        newDocument = {
          ...newDocument,
          content: {
            ...require(`./content/convert-content-${type}`)(document, newDocument.variant)
          }
        }
        logger('info', ['convert-from-old', `${index} / ${documents.length}`, document._id, type, 'added specific properties'])
        //saveFile({ filePath: `${__dirname}/../test/new/${document._id}.json`, data: newDocument })
        index++
        return newDocument
      } catch (error) {
        logger('error', ['convert-from-old', `${index} / ${documents.length}`, document._id, document.documentType, document.documentCategory, error])
      }

      index++
    })

    resolve(converted)
  })
}
