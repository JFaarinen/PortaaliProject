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
    const dispatch = useDispatch();
    const history = useHistory();

    const lisaaKategoria = (event) => {
        event.preventDefault();
        const kategoria = event.target.kuvaus.value;
        event.target.kuvaus.value = '';
        setKategoriat(kategoriat.concat(kategoria));
    }

    const lisaaTuote = async (event) => {
        event.preventDefault();
        const tuoteTiedot = {
            nimi: nimi,
            hinta: hinta,
            kuvaus: kuvaus,
            lkm: lkm,
            kategoria: kategoriat
        }
        setNimi('');
        setHinta('');
        setKuvaus('');
        setLkm('');
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
                    <div>
                        <label>Nimi:</label>
                        <input
                            name='nimi'
                            type='text'
                            value={nimi}
                            onChange={(event) => setNimi(event.target.value)} />

                    </div>
                    <div>
                        <label>Hinta:</label>
                        <input
                            name='hinta'
                            type='number'
                            value={hinta}
                            onChange={(event) => setHinta(event.target.value)} />

                    </div>
                    <div>
                        <label>Kuvaus:</label>
                        <textarea>
                            name='kuvaus'
                            rows='4'
                            onChange={(event) => setKuvaus(event.target.value)}
                        </textarea>
                    </div>
                    <div>
                        <label>Määrä</label>
                        <input
                            name='lkm'
                            type='number'
                            value={lkm}
                            onChange={(event) => setLkm(event.target.value)}
                        />

                    </div>
                    <button type='submit'>Lisää tuote</button>
                </form>
            </div>
            <div>
                <form onSubmit={lisaaKategoria}>
                    Kuvaus: <input
                        name='kuvaus'
                    />
                    <button type='submit'>Lisää kategoria</button>
                    {kategoriat.map((k, id) => <li key={id}>{k}</li>)}
                </form>
            </div>
        </div>
    );

}
export default UusiTuote;

