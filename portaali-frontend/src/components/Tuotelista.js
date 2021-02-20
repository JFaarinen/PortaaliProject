import React from 'react';
import { Link } from 'react-router-dom';

const TuoteLista = ({ tuotteet }) => {
    return (
        <div className='section-center'>
            {tuotteet.map((t) => {
                const { id, nimi, img } = t;

                return (
                    <article key={id} className='tuote-kuvaus'>
                        <img src={img} alt={nimi} className='photo-list' />
                        <div className='tuote-info'>
                            <div>
                                <Link to={`/tuotteet/${id}`}>
                                    <h4>{nimi}</h4>
                                </Link>
                                <h4>Hinta €</h4>
                            </div>
                        </div>
                    </article>
                )
            })}

        </div>
    )
}

export default TuoteLista;