import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikki: 0
        }
    }
    /*
        klikHyva = () => {
            this.setState({
                hyva: this.state.hyva + 1,
                kaikki: this.state.kaikki + 1
            })
        }
    
        klikNeutraali = () => {
            this.setState({
                neutraali: this.state.neutraali + 1,
                kaikki: this.state.kaikki + 1
            })
        }
    
        klikHuono = () => {
            this.setState({
                huono: this.state.huono + 1,
                kaikki: this.state.kaikki + 1
            })
        }
    */
    klikkaa = (arvo) => {
        return () => {
            if (arvo === "h") {
                this.setState({
                    hyva: this.state.hyva + 1,
                    kaikki: this.state.kaikki + 1
                })
            } else if (arvo === "n") {
                this.setState({
                    neutraali: this.state.neutraali + 1,
                    kaikki: this.state.kaikki + 1
                })
            } else if (arvo === "p") {
                this.setState({
                    huono: this.state.huono + 1,
                    kaikki: this.state.kaikki + 1
                })
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>anna palautetta</h2>
                    <Button handleClick={this.klikkaa("h")} text="Hyvä" />
                    <Button handleClick={this.klikkaa("n")} text="Neutraali" />
                    <Button handleClick={this.klikkaa("p")} text="Huono" />
                </div>
                <h2>statistiikka</h2>
                <Statistics numero={this.state} />
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = (props) => {
    return (
        <table><tbody>
            <tr>
                <th>{props.text}</th>
                <td>{props.numero}</td>
                <td>{props.prossat}</td>
            </tr>
        </tbody></table>
    )
}

const Statistics = (props) => {
    if (props.numero.kaikki === 0) {
        return (
            <div>Ei yhtään palautetta annettu</div>
        )
    }
    return (
        <div>
            <Statistic text="Hyvä: " numero={props.numero.hyva} />
            <Statistic text="Neutraali: " numero={props.numero.neutraali} />
            <Statistic text="Huono: " numero={props.numero.huono} />
            <Statistic text="Keskiarvo: " numero={(props.numero.hyva + (props.numero.huono * - 1)) / props.numero.kaikki} />
            <Statistic text="Palautteesta positiivisia: " numero={(props.numero.hyva) / (props.numero.kaikki) * 100} prossat="%" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))