const generateYear = require('../generate-year')
const convertDate = require('../convert-date')
const utdanningsprogrammer = require('../utdanningsprogrammer.json')

module.exports = (document) => {
  return {
    bekreftelse: {
      oppmotested: document.utplasseringData.oppmotested,
      fraDato: convertDate(document.utplasseringData.startDato),
      tilDato: convertDate(document.utplasseringData.sluttDato),
      daysPerWeek: document.utplasseringData.daysPerWeek,
      startTid: document.utplasseringData.startTid,
      sluttTid: document.utplasseringData.sluttTid,
      kopiPrEpost: [],
      kontaktPersonData: document.kontaktpersonData,
      parorendeData: document.parorendeData,
      bedriftsNavn: document.bedriftsNavn,
      bedriftsData: document.bedriftsData
    },
    utdanningsprogram: utdanningsprogrammer.find(program => program.kortform.nb === document.utdanningsprogram),
    level: document.classLevel,
    year: generateYear(document)
  }
}
