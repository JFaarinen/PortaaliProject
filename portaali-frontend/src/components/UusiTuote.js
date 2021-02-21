import React from 'react';

const UusiTuote = () => {
    const lisaaTuote = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={lisaaTuote}>
            <button type="submit">Lisää tuote</button>
        </form>
    );

}
export default UusiTuote;

