import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (propsi) => {
    return (
        <div>
            <h1>{propsi.kurssi.nimi}</h1>
        </div>
    )
}

const Sisalto = (propsi) => {
    return (
        <div>
            <Osa osa={propsi.osat[0].nimi} tehtava={propsi.osat[0].tehtavia} />
            <Osa osa={propsi.osat[1].nimi} tehtava={propsi.osat[1].tehtavia} />
            <Osa osa={propsi.osat[2].nimi} tehtava={propsi.osat[2].tehtavia} />
        </div>
    )
}

const Osa = (propsi) => {
    return (
        <div>
            <p>{propsi.osa} {propsi.tehtava}</p>
        </div>
    )
}

const Yhteensa = (propsi) => {
    return (
        <div>
            <p>yhteensä {propsi.osat[0].tehtavia + propsi.osat[1].tehtavia + propsi.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)