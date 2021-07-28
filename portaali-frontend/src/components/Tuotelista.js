import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alustaTuotteet } from '../reducers/tuoteReducer';

const TuoteLista = () => {
    const tuotteet = useSelector(state => state.tuotteet);
    console.log(tuotteet);
    return (
        <div className='section-center'>
            {tuotteet.map((t) => {
                const { id, nimi, img, lkm, hinta } = t;

                return (
                    <article key={id} className='tuote-kuvaus'>
                        <img src={img[0]} alt={nimi} className='photo-list' />
                        <div className='tuote-info'>
                            <div>
                                <Link to={`/tuotteet/${id}`}>
                                    <h4>{nimi}</h4>
                                </Link>
                                <h4>Saatavilla: {lkm} kpl</h4>
                                <h4>Hinta {hinta} €</h4>
                            </div>
                        </div>
                    </article>
                )
            })}

        </div>
    )
}

export default TuoteLista;