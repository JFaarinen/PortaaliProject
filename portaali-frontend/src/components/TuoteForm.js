import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tuoteService from '../services/tuotteet';
import { useHistory } from 'react-router';
import HakusanaForm from './HakusanaForm';
import { lisaaTuote } from '../reducers/tuoteReducer';

const TuoteForm = () => {
    const [hakusanat, setHakusanat] = useState([]);
    const [nimi, setNimi] = useState('');
    const [hinta, setHinta] = useState('');
    const [kuvaus, setKuvaus] = useState('');
    const [lkm, setLkm] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const lisaaHakusana = (hakusana) => {
        setHakusanat(hakusanat.concat(hakusana));
    }

    const handleTuoteLisays = async (event) => {
        event.preventDefault();
        const tuoteTiedot = {
            nimi: nimi,
            hinta: hinta,
            kuvaus: kuvaus,
            lkm: lkm,
            kategoria: hakusanat
        }
        setNimi('');
        setHinta('');
        setKuvaus('');
        setLkm('');
        setHakusanat([]);
        const uusiTuote = await tuoteService.create(tuoteTiedot);
        dispatch(lisaaTuote(uusiTuote));
        history.push(`/kuvienLataus/${uusiTuote.id}`)

    };

    return (
        <div>
            <div>
                <form onSubmit={handleTuoteLisays}>
                    <div>
                        <label>Nimi:</label>
                        <input
                            name='nimi'
                            type='text'
                            value={nimi}
                            onChange={({ target }) => setNimi(target.value)} />

                    </div>
                    <div>
                        <label>Hinta:</label>
                        <input
                            name='hinta'
                            type='text'
                            value={hinta}
                            onChange={({ target }) => setHinta(target.value)} />

                    </div>
                    <div>
                        <div>
                            <label>Kuvaus:</label>
                        </div>
                        <textarea
                            name='kuvaus'
                            rows='5'
                            onChange={({ target }) => setKuvaus(target.value)} />
                    </div>
                    <div>
                        <label>Määrä</label>
                        <input
                            name='lkm'
                            type='number'
                            value={lkm}
                            onChange={({ target }) => setLkm(target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label>Hakusanat:</label>
                        </div>
                        <div>
                            {hakusanat.map((k, id) => <li key={id}>{k}</li>)}
                        </div>
                    </div>
                    <button type='submit'>Lisää tuote</button>
                </form>
            </div>
            <HakusanaForm lisaaHakusana={lisaaHakusana} />
        </div>
    );

}
export default TuoteForm;

