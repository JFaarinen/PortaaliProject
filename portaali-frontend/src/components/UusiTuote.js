import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tuoteService from '../services/tuotteet';

const UusiTuote = (props) => {
    const [kategoriat, setKategoriat] = useState([]);
    const dispatch = useDispatch();

    const lisaaKategoria = (event) => {
        event.preventDefault();
        const kategoria = event.target.kuvaus.value;
        event.target.kuvaus.value = '';
        setKategoriat(kategoriat.concat(kategoria));
    }

    const lisaaTuote = async (event) => {
        const tuoteTiedot = {
            "nimi": event.target.nimi.value,
            "hinta": event.target.hinta.value,
            "kuvaus": event.target.kuvaus.value,
            "lkm": event.target.lukumaara.value,
            "kuva": event.target.kuva.value,
            "kategoria": kategoriat
        }
        event.target.nimi.value = '';
        event.target.hinta.value = '';
        event.target.kuvaus.value = '';
        event.target.lukumaara.value = '';
        event.target.kuva.value = '';
        setKategoriat([]);
        const uusiTuote = await tuoteService.create(tuoteTiedot);
        dispatch(lisaaTuote(uusiTuote))
            .then((res) => {
                if (res) {
                    props.history.push(`/kuvienLataus/${111}`);

                }
            })
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

