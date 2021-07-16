import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tuoteService from '../services/tuotteet';
import { useHistory } from 'react-router';

const UusiTuote = () => {
    const [kategoriat, setKategoriat] = useState([]);
    const [nimi, setNimi] = useState('');
    const [hinta, setHinta] = useState('');
    const [kuvaus, setKuvaus] = useState('');
    const [lkm, setLkm] = useState('');
    const [kuva, setKuva] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleNimiChange = (event) => {
        setNimi(event.target.value);
    };

    const handleHintaChange = (event) => {
        setHinta(event.target.value);
    };

    const handleKuvausChange = (event) => {
        setKuvaus(event.target.value);
    };

    const handleLkmChange = (event) => {
        setLkm(event.target.value);
    };

    const handleKuvaChange = (event) => {
        setKuva(event.target.value);
    };

    const lisaaKategoria = (event) => {
        event.preventDefault();
        const kategoria = event.target.kuvaus.value;
        event.target.kuvaus.value = '';
        setKategoriat(kategoriat.concat(kategoria));
    }

    const lisaaTuote = async (event) => {
        event.preventDefault();
        const tuoteTiedot = {
            "nimi": nimi,
            "hinta": hinta,
            "kuvaus": kuvaus,
            "lkm": lkm,
            "kuva": kuva,
            "kategoria": kategoriat
        }
        setNimi('');
        setHinta('');
        setKuvaus('');
        setLkm('');
        setKuva('');
        setKategoriat([]);
        const uusiTuote = await tuoteService.create(tuoteTiedot);
        dispatch(lisaaTuote(uusiTuote))
            .then(
                history.push(`/kuvienLataus/${uusiTuote.id}`)
            );
    };

    return (
        <div>
            <div>
                <form onSubmit={lisaaTuote}>
                    Nimi: <input value={nimi} onChange={handleNimiChange} />
                    Hinta: <input value={hinta} onChange={handleHintaChange} />
                    Kuvaus: <input value={kuvaus} onChange={handleKuvausChange} />
                    Määrä: <input value={lkm} onChange={handleLkmChange} />
                    Kuva: <input value={kuva} onChange={handleKuvaChange} />
                    <button type="submit">Lisää tuote</button>
                </form>
            </div>
            <div>
                <form onSubmit={lisaaKategoria}>
                    Kuvaus: <input name='kuvaus' />
                    <button type='submit'>Lisää kategoria</button>
                    {kategoriat.map((k, id) => <li key={id}>{k}</li>)}
                </form>
            </div>
        </div>
    );

}
export default UusiTuote;

