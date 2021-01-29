const grepMaal = require('../../../data/maal.json')
const programomraader = require('../../../data/programomraader.json')
const programomraaderMaal = require('../../../data/programomraader-maal.json')

const lowTrim = (val) => val && val.toLowerCase().trim()

module.exports = (maal, utplassering) => {
  const progomrade = lowTrim(maal.programomrade) // blomsterdekoratør
  const kompmaal = lowTrim(maal.kompetanseMaal) // kvalitetssikre bruk og oppbevaring av blomster og andre råvarer i eigen produksjon

  // Finne programområde
  let programomraade = programomraaderMaal
    .find(omrade => lowTrim(omrade.tittel.nb) === progomrade || lowTrim(omrade.tittel.nn) === progomrade)

  if (!programomraade) {
    programomraade = programomraader
      .find(omrade => lowTrim(omrade.tittel.nb) === progomrade || lowTrim(omrade.tittel.nn) === progomrade)

    programomraade = programomraade && programomraaderMaal
      .find(omrade => omrade.kode === programomraade.kode)
  }

  if (!programomraade) {
    if (progomrade === 'elektrofag') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'ELELE1----')
    if (kompmaal === 'følge etiske normer, regler for personvern og krav til helse, miljø og sikkerhet') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'SSTRL2----')
    if (kompmaal === 'selge et produkt og yte en tjeneste som dekker kundens behov') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'SRSSR1----')
    if (kompmaal === 'gjøre rede for servicenivået i virksomheter og kunne gi slik service') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'SRSSR1----')
  }

  // Finne kompetansemaal
  let kompetansemaal = programomraade.maal.find(mal => lowTrim(mal.tittel.nb) === kompmaal || lowTrim(mal.tittel.nn) === kompmaal)
  if (!kompetansemaal) {
    kompetansemaal = grepMaal.find(mal => lowTrim(mal.tittel.nb) === kompmaal || lowTrim(mal.tittel.nn) === kompmaal) || {
      kode: 'UKJENT',
      'url-data': '',
      tittel: {
        nb: kompmaal,
        nn: kompmaal,
        en: kompmaal
      }
    }
  }

  return {
    created: {
      timestamp: maal.timeStamp,
      createdBy: maal.userId
    },
    modified: [
      {
        timestamp: maal.timeStamp,
        createdBy: maal.userId
      }
    ],
    type: 'maal',
    student: maal.studentUserName,
    studentUserName: maal.studentUserName,
    referanseID: utplassering ? utplassering._id : maal.utplasseringID,
    referanseTittel: maal.utplasseringsSted,
    programomraade: {
      kode: programomraade.kode || 'UKJENT',
      'url-data': programomraade['url-data'] || '',
      tittel: programomraade.tittel,
      opplaeringssted: programomraade.opplaeringssted || []
    },
    grep: {
      kode: kompetansemaal.kode,
      'url-data': kompetansemaal['url-data'] || '',
      tittel: kompetansemaal.tittel
    },
    arbeidsoppgaver: maal.arbeidsOppgaver,
    old: maal
  }
}
