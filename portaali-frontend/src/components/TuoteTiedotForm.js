import React, { useState } from 'react';
import tuote from '../../../portaali-backend/models/tuote';

const TuoteTiedotForm = ({ tuoteTiedot, setTuoteTiedot }) => {
    const [values, setValues] = useState({ tuote: '', hinta: 0, lkm: 1 });
    const handleSubmit = (event) => {
        event.preventDefault();
        const tuotteet = tuoteTiedot.map(t => t.tuote);
        if (tuotteet.includes(values.tuote)) {
            console.log('Vastaava tuote on jo listassa');
        } else {
            setTuoteTiedot(tuoteTiedot.connect({ tuote: values.tuote, hinta: values.hinta, lkm: values.lkm }))
            setValues({ tuote: '', hinta: 0, lkm: 1 });
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Tuote: <input
                        name='tuote'
                        type='text'
                        value={values.tuote}
                        onChange={(event) => setValues({ ...values, tuote: event.target.value })}
                    />
                </div>
                Hinta: <input
                    name='hinta'
                    type='text'
                    value={values.hinta}
                    onChange={(event) => setValues({ ...values, hinta: event.target.value })}
                />
                Lkm: <input
                    name='lkm'
                    type='number'
                    value={values.lkm}
                    onChange={(event) => setValues({ ...values, lkm: event.target.value })}
                />
                <button type='submit'>Lisää tuote</button>
            </form>
            <ul>
                {tuoteTiedot.map((t) => <li>{t.tuote}</li>)}
            </ul>
        </div>
    );
}

export default TuoteTiedotForm;