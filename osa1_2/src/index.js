import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (propsi) => {
    return (
        <div>
            <h1>{propsi.name}</h1>
        </div>
    )
}

const Sisalto = (propsi) => {
    return (
        <div>
            <Osa osa = {propsi.osa1} tehtava = {propsi.tehtava1}/>
            <Osa osa = {propsi.osa2} tehtava = {propsi.tehtava2}/>
            <Osa osa = {propsi.osa3} tehtava = {propsi.tehtava3}/>
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
            <p>yhteensä {propsi.tehtava1 + propsi.tehtava2 + propsi.tehtava3} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  return (
    <div>
      <Otsikko name = {kurssi} />
      <Sisalto osa1 = {osa1.nimi} osa2 = {osa2.nimi} osa3 = {osa3.nimi} tehtava1 = {osa1.tehtavia} tehtava2 = {osa2.tehtavia} tehtava3 = {osa3.tehtavia}/>
      <Yhteensa tehtava1 = {osa1.tehtavia} tehtava2 = {osa2.tehtavia} tehtava3 = {osa3.tehtavia}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)