import React from 'react'

const Otsikko = ({ kurssi }) => {
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
        </div>
    )
};

const Sisalto = (props) => {
    const sisalto = props.osat;
    const palauta = sisalto.map(osa => <p key={osa.id}>{osa.nimi}, tehtäviä {osa.tehtavia}</p>);

    return (
        <div>
            {palauta}
        </div>
    )
};

const Yhteensa = (props) => {
    const tehtavat = props.osat;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const yhteensa = tehtavat.map(osa => osa.tehtavia).reduce(reducer);
    return (
        <div>
            <p>Yhteensä {yhteensa} tehtävää</p>
        </div>
    )
};

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto osat={props.kurssi.osat} />
            <Yhteensa osat={props.kurssi.osat} />
        </div>
    )
}

export default Kurssi