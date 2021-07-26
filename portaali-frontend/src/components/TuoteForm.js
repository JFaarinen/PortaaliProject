import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tuoteService from '../services/tuotteet';
import { useHistory } from 'react-router';
import HakusanaForm from './HakusanaForm';
import { lisaaTuote } from '../reducers/tuoteReducer';

const TuoteForm = () => {
    const [hakusanat, setHakusanat] = useState([]);
    const [tiedot, setTiedot] = useState({nimi: '', hinta: '', kuvaus: '', lkm: ''});
    const dispatch = useDispatch();
    const history = useHistory();

    const lisaaHakusana = (hakusana) => {
        setHakusanat(hakusanat.concat(hakusana));
    }

    const handleTuoteLisays = async (event) => {
        event.preventDefault();
        const tuoteTiedot = {
            nimi: tiedot.nimi,
            hinta: tiedot.hinta,
            kuvaus: tiedot.kuvaus,
            lkm: tiedot.lkm,
            kategoria: hakusanat
        }
        setTiedot({nimi: '', hinta: '', kuvaus: '', lkm: ''});
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
                            value={tiedot.nimi}
                            onChange={(e) => setTiedot({...tiedot, nimi: e.target.value})} />

                    </div>
                    <div>
                        <label>Hinta:</label>
                        <input
                            name='hinta'
                            type='text'
                            value={tiedot.hinta}
                            onChange={(e) => setTiedot({...tiedot, hinta: e.target.value})} />

                    </div>
                    <div>
                        <div>
                            <label>Kuvaus:</label>
                        </div>
                        <textarea
                            name='kuvaus'
                            rows='5'
                            value={tiedot.kuvaus}
                            onChange={(e) => setTiedot({...tiedot, nimi: e.target.value})} />
                    </div>
                    <div>
                        <label>Määrä</label>
                        <input
                            name='lkm'
                            type='number'
                            value={tiedot.lkm}
                            onChange={(e) => setTiedot({...tiedot, nimi: e.target.value})}
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

