import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './TuoteTiedot.css';

const Tuote = ({ ostoskori, setOstoskori }) => {
    const id = useParams().id;
    const tuote = useSelector(state => state.tuotteet.find(t => t.id === id));
    const [lkm, setLkm] = useState(1);
    console.log(`Id: ${id} tyyppi: ${typeof (id)}`);
    console.log('tuote: ', tuote);

    const lisaaKoriin = (event) => {
        event.preventDefault();
        const kpl = event.target.kpl.value;
        event.target.kpl.value = '';
        const varaus = {
            tuote: tuote.nimi,
            hinta: tuote.hinta,
            lkm: kpl
        }
        const koriUpd = ostoskori.concat(varaus);
        console.log(koriUpd);
        setOstoskori(koriUpd);
        console.log(ostoskori);
    }

    if (!tuote) {
        return <div>Loading...</div>
    }

    return (
        <div className='tuote'>
            <div className='otsikko'>
                <h2>{tuote.otsikko}</h2>
            </div>
            <div className='tuote_tiedot'>
                <div className='tuote_vasen'>
                    <div className='img_vasen'>
                        <div className='selaus'>
                            <i class="fas fa-arrow-circle-left" size="3x"></i>
                        </div>
                        <img
                            src={tuote.img[0].kuvatiedosto}
                            alt={tuote.otsikko}
                            className='kuva'
                        />
                        <div className='selaus'>
                            <i class="fas fa-arrow-circle-right" size="3x"></i>
                        </div>

                    </div>
                    <p>{tuote.kuvaus}</p>
                </div>
                <div className='tuote_oikea'>
                    <div className='oikea_info'>
                        <ul>
                            {tuote.tuoteTiedot.map(t =>
                                <li key={t._id}>{t.tuote} {
                                    <select value={lkm} onChange={(e) => setLkm(e.target.value)}>
                                        {
                                            [...Array(t.lkm).keys()].map((x) =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )
                                        }
                                    </select>
                                }kpl {t.hinta}€</li>
                            )}
                        </ul>

                    </div>
                    <form onSubmit={lisaaKoriin}>
                        <button type='submit'>Lisää koriin</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Tuote;