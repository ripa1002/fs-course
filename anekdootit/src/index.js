import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            aanet: [0, 0, 0, 0, 0, 0],
            isoin: 0
        }
    }

    klikkaa = () => {
        const luku = Math.floor(Math.random() * 6)
        this.setState({
            selected: luku
        })
    }

    aanesta = (anekdootinNumero) => {
        return () => {
            const apu = [ ...this.state.aanet ]
            apu[anekdootinNumero] += 1
            const indeksi = apu.indexOf(Math.max(...apu))
            this.setState({
                aanet: apu,
                isoin: indeksi
            })
        }
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <div>Äänet: {this.state.aanet[this.state.selected]}</div>
                <div>
                    <Button handleClick={this.aanesta(this.state.selected)} text="Äänestä" />
                    <Button handleClick={this.klikkaa} text="Anna anekdootti" />
                </div>
                <div>
                    <h2>Eniten ääniä saanut anekdootti</h2>
                    {this.props.anecdotes[this.state.isoin]}
                    <div>Äänet: {this.state.aanet[this.state.isoin]}</div>
                </div>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)