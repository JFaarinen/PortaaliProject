import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const Tuote = ({ ostoskori, setOstoskori }) => {
    const id = useParams().id;
    const tuote = useSelector(state => state.tuotteet.find(t => t.id === id));
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
            <h2 className='otsikko'>{tuote.otsikko}</h2>
            <img
                src={tuote.img[0].kuvatiedosto}
                alt={tuote.otsikko}
                className='kuva'
            />
            <div className='tiedot'>
                <h4>Tuotteet</h4>
                <ul>
                    {tuote.tuoteTiedot.map(t =>
                        <li key={t._id}>{t.tuote} {t.lkm}kpl {t.hinta}€</li>
                    )}
                </ul>
            </div>
            <div className='kuvaus'>
                <p>{tuote.kuvaus}</p>
            </div>
            <form onSubmit={lisaaKoriin}>
                <input name='kpl' />
                <button type='submit'>Lisää koriin</button>
            </form>
        </div>
    )

}

export default Tuote;