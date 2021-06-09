import React, { useState } from 'react';
import tuoteService from '../services/tuotteet';

const UusiTuote = () => {
    const [kategoriat, setKategoriat] = useState([]);

    const lisaaKategoria = (event) => {
        event.preventDefault();
        const kategoria = event.target.kuvaus.value;
        event.target.kuvaus.value = '';
        setKategoriat(kategoriat.concat(kategoria));
    }
    const lisaaTuote = (event) => {
        event.preventDefault();
        const uusiTuote = {
            "nimi": event.target.nimi.value,
            "hinta": event.target.hinta.value,
            "kuvaus": event.target.kuvaus.value,
            "lkm": event.target.lukumaara.value,
            "kuva": event.target.kuva.value,
            "kategoria": kategoriat
        }
        tuoteService
            .create(uusiTuote)
            .then(response => {
                console.log('tuote lisätty ', response);

            });
        event.target.nimi.value = '';
        event.target.hinta.value = '';
        event.target.kuvaus.value = '';
        event.target.lukumaara.value = '';
        event.target.kuva.value = '';
        setKategoriat([]);
    }

    return (
        <div>
            <form onSubmit={lisaaTuote}>
                Nimi: <input name='nimi' />
                Hinta: <input name='hinta' />
                Kuvaus: <input name='kuvaus' />
                Määrä: <input name='lukumaara' />
                Kuva: <input name='kuva' />
                <button type="submit">Lisää tuote</button>
            </form>
            <form onSubmit={lisaaKategoria}>
                Kuvaus: <input name='kuvaus' />
                <button type='submit'>Lisää kategoria</button>
                {kategoriat.map((k, id) => <li key={id}>{k}</li>)}
            </form>
        </div>
    );

}
export default UusiTuote;

