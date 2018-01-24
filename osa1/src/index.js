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
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko name = {kurssi} />
      <Sisalto osa1 = {osa1} osa2 = {osa2} osa3 = {osa3} tehtava1 = {tehtavia1} tehtava2 = {tehtavia2} tehtava3 = {tehtavia3}/>
      <Yhteensa tehtava1 = {tehtavia1} tehtava2 = {tehtavia2} tehtava3 = {tehtavia3}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)