import React from 'react';

const TuoteLista = ({ tuotteet }) => {
    return (
        <div className='section-center'>
            {tuotteet.map((t) => {
                const { id, tuote, lkm, kuvaus, img } = t;

                return (
                    <article key={id} className='tuote-kuvaus'>
                        <img src={img} alt={tuote} className='photo' />
                        <div className='tuote-info'>
                            <div>
                                <h4>{tuote}</h4>
                                <h4>Hinta €</h4>
                            </div>
                            <p className='tuote-text'>{kuvaus}</p>
                        </div>
                    </article>
                )
            })}

        </div>
    )
}

export default TuoteLista;