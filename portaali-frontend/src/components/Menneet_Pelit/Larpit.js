import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material/';
import mockdata from './mockdata';
import './Larpit.css';

const Larpit = () => {
    const [pelit, setPelit] = useState(mockdata);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const maxIndex = pelit.length -1;
        if (index < 0) {
            setIndex(maxIndex);
        }
        if (index > maxIndex) {
            setIndex(0)
        }
    }, [index, pelit]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index +1);
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);

    return(
        <section className = 'section'>
            <div className='otsikko'>
                <h2>Menneitä yhteistyöprojekteja</h2>
            </div>
            <div className='larpSlider'>
                {
                    pelit.map((peli, peliIndex) => {
                        const { id, kansikuva, pelinNimi, kuvaus} = peli;
                        let sijainti = 'seuraava';
                        if (peliIndex === index) {
                            sijainti='aktiivinen'
                        }
                        if (
                            peliIndex === index -1 || (index === 0 && peliIndex === pelit.length -1)
                        ) {
                            sijainti = 'edellinen'
                        }

                        return (
                            <article className={sijainti} key={id}>
                                <img src={kansikuva} alt={pelinNimi} className='peli-img' />
                                <h3>{pelinNimi}</h3>
                                <p className='kuvausTeksti'>{`${kuvaus.substring(0, 200)}...`}</p>
                                <Link to={`/larpit/${id}`}>
                                    Näytä lisää
                                </Link>
                            </article>
                        );
                    })}
                    <div className='btnEdellinen' onClick={() => setIndex(index-1)}>
                        <ArrowCircleLeft fontSize='large' />
                    </div>
                    <div className='btnSeuraava' onClick={() => setIndex(index+1)}>
                        <ArrowCircleRight fontSize='large' />   
                    </div>
            </div>
        </section>
    );
};

export default Larpit;