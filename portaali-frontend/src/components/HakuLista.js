import React from 'react';

const Kategoriat = ({ kategoriat, tuoteSuodatus }) => {
    return (
        <div className="btn-container">
            {kategoriat.map((kategoria) => {
                return (
                    <button
                        type='button'
                        className='filter-btn'
                        key={kategoria}
                        onClick={() => tuoteSuodatus(kategoria)}
                    >
                        {kategoria}
                    </button>
                );
            })
            }
        </div>
    );
}

export default Kategoriat;