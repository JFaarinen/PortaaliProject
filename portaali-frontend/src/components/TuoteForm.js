import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tuoteService from '../services/tuotteet';
import { useHistory } from 'react-router';
import TuoteTiedotForm from './TuoteTiedotForm';
import KuvaForm from './KuvaForm';
import HakusanaForm from './HakusanaForm';
import { lisaaTuote } from '../reducers/tuoteReducer';

const TuoteForm = () => {
    const [hakusanat, setHakusanat] = useState([]);
    const [tuoteRyhma, setTuoteRyhma] = useState({ otsikko: '', kuvaus: '' });
    const [tuoteTiedot, setTuoteTiedot] = useState([]);
    const [kuvat, setKuvat] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const lisaaHakusana = (hakusana) => {
        setHakusanat(hakusanat.concat(hakusana));
    }

    const handleTuoteLisays = async (event) => {
        event.preventDefault();
        const uusiTuote = {
            otsikko: tuoteRyhma.otsikko,
            kuvaus: tuoteRyhma.kuvaus,
            tuoteTiedot: tuoteTiedot,
            img: kuvat
        }
        setTuoteRyhma({ nimi: '', hinta: '' });
        setTuoteTiedot([]);
        setKuvat([]);
        const lisattyTuote = await tuoteService.create(uusiTuote);
        dispatch(lisaaTuote(uusiTuote));
    };

    return (
        <div>
            <div>
                <form id="tuoteForm" onSubmit={handleTuoteLisays}>
                    <div>
                        <label>Otsikko:</label>
                        <input
                            name='otsikko'
                            type='text'
                            value={tuoteRyhma.otsikko}
                            onChange={(e) => setTuoteRyhma({ ...tuoteRyhma, otsikko: e.target.value })} />

                    </div>
                    <div>
                        <label>Kuvaus:</label>
                        <input
                            name='kuvaus'
                            type='text'
                            value={tuoteRyhma.kuvaus}
                            onChange={(e) => setTuoteRyhma({ ...tuoteRyhma, kuvaus: e.target.value })} />

                    </div>

                    <div>
                        <div>
                            <label>Hakusanat:</label>
                        </div>
                        <div>
                            {hakusanat.map((k, id) => <li key={id}>{k}</li>)}
                        </div>
                    </div>

                </form>
                <TuoteTiedotForm tuoteTiedot={tuoteTiedot} setTuoteTiedot={setTuoteTiedot} />
                <KuvaForm kuvat={kuvat} setKuvat={setKuvat} />
                <button type="submit" form="tuoteForm">Lisää tuote</button>
            </div>
            <HakusanaForm lisaaHakusana={lisaaHakusana} />
        </div>
    );

}
export default TuoteForm;

