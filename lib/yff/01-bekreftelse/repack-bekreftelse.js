const convertDate = require('../../convert-date')

module.exports = bekreftelse => {
  return {
    created: {
      timestamp: bekreftelse.timeStamp,
      createdBy: bekreftelse.userId
    },
    modified: [
      {
        timestamp: bekreftelse.timeStamp,
        modifiedBy: bekreftelse.userId
      }
    ],
    type: 'utplassering',
    student: bekreftelse.studentUserName,
    oppmotested: bekreftelse.utplasseringData.oppmotested,
    kopiPrEpost: bekreftelse.kopiPrEpost.replace(/mailto:/, '').split(/[\s/;,]+/).filter(epost => !!epost && epost.includes('@')),
    fraDato: convertDate(bekreftelse.utplasseringData.startDato) || convertDate(bekreftelse.utplasseringData.sluttDato) || '01.01.2020',
    tilDato: convertDate(bekreftelse.utplasseringData.sluttDato) || convertDate(bekreftelse.utplasseringData.startDato) || '01.01.2020',
    daysPerWeek: bekreftelse.utplasseringData.daysPerWeek,
    startTid: bekreftelse.utplasseringData.startTid,
    sluttTid: bekreftelse.utplasseringData.sluttTid,
    kontaktpersonData: bekreftelse.kontaktpersonData,
    parorendeData: bekreftelse.parorendeData,
    bedriftsNavn: bekreftelse.bedriftsNavn,
    bedriftsData: bekreftelse.bedriftsData,
    old: bekreftelse
  }
}
