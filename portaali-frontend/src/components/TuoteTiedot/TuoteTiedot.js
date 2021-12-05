import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material/';
import './TuoteTiedot.css';

const TuoteRivi = ({tuote}) => {
    const [lkm, setLkm] = useState(1);

    return(
    <li>{tuote.tuote} {
        <select value={lkm} onChange={(e) => setLkm(e.target.value)}>
            {
                [...Array(tuote.lkm).keys()].map((x) =>
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                )
            }
        </select>
    }kpl {tuote.hinta}€</li>
    );
};

const Tuote = ({ ostoskori, setOstoskori }) => {
    const id = useParams().id;
    const tuote = useSelector(state => state.tuotteet.find(t => t.id === id));
    const [imgNro, setImgNro] = useState(0);
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

    const selausNxt = (event) => {
        if (imgNro === tuote.img.length - 1) {
            setImgNro(0);
        } else {
            setImgNro(imgNro + 1);
        }
    };

    const selausPrev = (event) => {
        if (imgNro === 0) {
            setImgNro(tuote.img.length - 1);
        } else {
            setImgNro(imgNro - 1);
        }
    };

    if (!tuote) {
        return <div>Loading...</div>
    };

    return (
        <div className='tuote'>
            <div className='otsikko'>
                <h2>{tuote.otsikko}</h2>
            </div>
            <div className='tuote_tiedot'>
                <div className='tuote_vasen'>
                    <div className='img_vasen'>
                    {tuote.img.length > 0 ?
                    <>
                        <div className='selaus' onClick={selausPrev}>
                            <ArrowCircleLeft fontSize='large' />
                        </div>
                        <img
                            src={tuote.img[imgNro].kuvatiedosto}
                            alt={tuote.otsikko}
                            className='kuva'
                        />
                        <div className='selaus' onClick={selausNxt}>
                            <ArrowCircleRight fontSize='large' />
                        </div>
                        </>
                        : <img src='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' className='kuva'/> }

                    </div>
                    <p>{tuote.kuvaus}</p>
                </div>
                <div className='tuote_oikea'>
                    <div className='oikea_info'>
                        <ul>
                            {tuote.tuoteTiedot.map(t => <TuoteRivi key={t._id} tuote={t} />

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