(async () => {
  const root = '../../..'
  const { ObjectId } = require('mongodb')
  const { logger } = require('@vtfk/logger')
  const { MONGODB_NAME_NEW, MONGODB_COLLECTION_NEW_YFF } = require(root + '/config')
  const mongo = require(root + '/lib/get-mongo')
  const repackTilbakemeldingUtplassering = require('./repack-tilbakemelding-utplassering')

  // Last inn gamle bekreftelser
  logger('info', ['yff', '03-tilbakemelding', 'henter inn tilbakemeldinger'])
  const tilbakemeldinger = require(root + '/data/yff/yff-tilbakemelding.json')
  logger('info', ['yff', '03-tilbakemelding', `hentet inn ${tilbakemeldinger.length} tilbakemeldinger som må håndteres`])

  logger('info', ['yff', '03-tilbakemelding', 'henter inn objekter som skal fylles'])
  const maal = require(root + '/data/yff/new/maal.json')
  const utplasseringer = require(root + '/data/yff/new/utplasseringer.json')

  // Koble til og dytt mål til databasen
  logger('info', ['yff', '03-tilbakemelding', 'kobler til mongo', MONGODB_NAME_NEW, MONGODB_COLLECTION_NEW_YFF])
  const db = await mongo(MONGODB_COLLECTION_NEW_YFF, MONGODB_NAME_NEW)

  // Håndter opplegget
  let totalMaal = 0
  let missingMaal = 0
  const promises = tilbakemeldinger.map(async tilbakemelding => {
    logger('info', ['yff', '03-tilbakemelding', tilbakemelding._id, 'håndterer tilbakemelding'])

    // Finn og oppdater utplassering
    const utplassering = utplasseringer.find(utplassering => utplassering.old._id === tilbakemelding.bedriftID)
    const [utplTilbakemelding, utplFravar] = repackTilbakemeldingUtplassering(tilbakemelding)
    await db.updateOne({ _id: ObjectId(utplassering._id) }, { $set: { tilbakemelding: utplTilbakemelding, fravar: utplFravar, oldTilbakemelding: tilbakemelding } })
    logger('info', ['yff', '03-tilbakemelding', tilbakemelding._id, 'tilbakemelding oppdatert', utplassering._id])

    totalMaal += tilbakemelding.maal.length
    // Finn og oppdater målene
    const malPromises = tilbakemelding.maal.map(async mal => {
      const kompmal = maal.find(m => m.old._id === mal.id)
      if (!kompmal) {
        logger('warn', ['yff', '03-tilbakemelding', tilbakemelding._id, 'fant ikke mål', mal.id])
        missingMaal++
        return null
      }
      await db.updateOne({ _id: ObjectId(kompmal._id) }, { $set: { tilbakemelding: mal.score } })
      logger('info', ['yff', '03-tilbakemelding', tilbakemelding._id, 'mål oppdatert', kompmal._id])
    })

    await Promise.all(malPromises)
  })

  await Promise.all(promises)
  logger('info', ['yff', '03-tilbakemelding', `håndtert ${tilbakemeldinger.length} tilbakemeldinger med ${totalMaal} mål hvorav ${missingMaal} ikke ble funnet`])

  logger('info', ['yff', '03-tilbakemelding', 'ferdig'])
  process.exit(0)
})()
