import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material/';
import { lisaaKoriin } from '../../redux/actions/koriActions';
import './TuoteTiedot.css';

const TuoteRivi = ({tuote}) => {
    const [lkm, setLkm] = useState(1);
    const dispatch = useDispatch();
    console.log('tuoterivi', tuote);

    const lisaysHandler = () => {
        dispatch(lisaaKoriin(tuote._id, lkm));
        console.log('tuote lisättty koriin.');
    }

    return(
    <li>{tuote.tuote} {
        <select value={lkm} onChange={(e) => setLkm(e.target.value)}>
            {
                [...Array(tuote.lkm).keys()].map((x) =>
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                )
            }
        </select>
    }kpl {tuote.hinta}€ <button onClick={lisaysHandler}>Lisää koriin</button></li>
    );
};

const Tuote = () => {
    const id = useParams().id;
    const tuote = useSelector(state => state.tuotteet.find(t => t.id === id));
    const [imgNro, setImgNro] = useState(0);
    console.log(`Id: ${id} tyyppi: ${typeof (id)}`);
    console.log('tuote: ', tuote);

    const selausNxt = () => {
        if (imgNro === tuote.img.length - 1) {
            setImgNro(0);
        } else {
            setImgNro(imgNro + 1);
        }
    };

    const selausPrev = () => {
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
                </div>
            </div>
        </div>
    )

}

export default Tuote;