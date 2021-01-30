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
    if (kompmaal === 'velge og montere riktig verktøy og utstyr på en maskin i henhold til arbeidsoppgaver') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'søke etter nødvendig informasjon for å kunne utføre arbeidsoppgaver') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'velge utstyr og arbeidsmetoder ut fra arbeidsoppgaver, standarder og prosedyrer') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'demontere og montere maskinelementer og utstyr som er relevant for arbeidsoppgaver') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'fylle ut aktuelle rapporter og skjemaer i forhold til arbeidsoppgaver') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'bruke ergonomisk riktige arbeidsteknikker og arbeidsstillinger') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'bruke verktøy og utstyr i henhold til lover og forskrifter') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'forklare sammenhengen mellom ergonomi, helse og effektivitet') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'velge sammenføyningsmetode og utføre sammenføyninger i henhold til arbeidsoppgaver og materialtype') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'velge riktig håndverktøy og utstyr for service, vedlikehold og reparasjoner') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'bearbeide materialer i henhold til arbeidsoppgaver') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'vurdere eget arbeid i henhold til planer, tegninger, beskrivelser og standarder') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'tolke og forklare arbeidsoppgaver') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'utføre arbeid etter regler for helse, miljø og sikkerhet og foreta risikovurderinger') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
    if (kompmaal === 'stille inn, bruke og overvåke maskiner og enkle anlegg') programomraade = programomraaderMaal.find(omrade => omrade.kode === 'TPTIP1----')
  }

  if (!programomraade) {
    console.log(progomrade, kompmaal)
  }

  // Finne kompetansemaal
  let kompetansemaal = null
  if (programomraade) kompetansemaal = programomraade.maal.find(mal => lowTrim(mal.tittel.nb) === kompmaal || lowTrim(mal.tittel.nn) === kompmaal)
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
