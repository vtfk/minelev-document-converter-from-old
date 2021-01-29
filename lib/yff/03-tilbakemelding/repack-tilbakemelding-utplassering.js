module.exports = (tilbakemelding) => {
  const getScore = (name) => tilbakemelding.evaluation.find(e => e.id === name).score

  return [{
    hms: {
      title: {
        nb: 'Eleven følger retningslinjer og HMS innenfor fagområdet',
        nn: 'Eleven følgjer retningslinjer og HMS innanfor fagområdet'
      },
      score: getScore('hms')
    },
    'respekt-retningslinjer': {
      title: {
        nb: 'Eleven viser gode holdninger og respekt for opplæringsstedets regler og retningslinjer',
        nn: 'Eleven viser gode haldningar og respekt for opplæringsstaden sine reglar og retningslinjer'
      },
      score: getScore('respekt-retningslinjer')
    },
    'respekt-mennesker': {
      title: {
        nb: 'Eleven viser gode holdninger og respekt for mennesker de møter under utplasseringen',
        nn: 'Eleven viser gode haldningar og respekt for menneske dei møter under utplasseringa'
      },
      score: getScore('respekt-mennesker')
    },
    tilpasningsdyktig: {
      title: {
        nb: 'Eleven er tilpasningsdyktig og kan samarbeide',
        nn: 'Eleven er tilpassingsdyktig og kan samarbeide'
      },
      score: getScore('tilpasningsdyktig')
    },
    kommunikasjon: {
      title: {
        nb: 'Eleven har kommunikasjonsevner i møte med kollegaer, kunder og brukere',
        nn: 'Eleven viser kommunikasjonsevner i møte med kollegaer, kundar og brukarar'
      },
      score: getScore('tilpasningsdyktig')
    },
    veiledning: {
      title: {
        nb: 'Eleven tar imot veiledning',
        nn: 'Eleven tek imot rettleiing'
      },
      score: getScore('veiledning')
    },
    oppfylle: {
      title: {
        nb: 'Eleven utfører tildelte arbeidsoppgaver',
        nn: 'Eleven utfører tildelte arbeidsoppgåver'
      },
      score: getScore('oppfylle')
    },
    initiativ: {
      title: {
        nb: 'Eleven viser initiativ og interesse for arbeidet',
        nn: 'Eleven viser initiativ og interesse for arbeidet'
      },
      score: getScore('initiativ')
    },
    orden: {
      title: 'Orden (punktlighet)',
      score: getScore('orden')
    },
    atferd: {
      title: 'Atferd (holdninger, respekt)',
      score: getScore('atferd')
    }
  },
  {
    dager: tilbakemelding.fravarDager,
    timer: tilbakemelding.fravarTimer,
    varslet: tilbakemelding.varsletFravar
  }]
}
