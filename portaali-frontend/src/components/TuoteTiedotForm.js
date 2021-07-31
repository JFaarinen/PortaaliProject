import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const TuoteTiedotForm = ({ tuoteTiedot, setTuoteTiedot }) => {
    const [values, setValues] = useState({ tuote: '', hinta: 0, lkm: 1 });
    const handleSubmit = (event) => {
        event.preventDefault();
        const tuotteet = tuoteTiedot.map(t => t.tuote);
        if (tuotteet.includes(values.tuote)) {
            console.log('Vastaava tuote on jo listassa');
        } else {
            setTuoteTiedot(tuoteTiedot.concat({ tuote: values.tuote, hinta: values.hinta, lkm: values.lkm }))
            setValues({ tuote: '', hinta: 0, lkm: 1 });
        }
    }
    return (
        <Grid container alignItems='center' spacing={2}>
            <form onSubmit={handleSubmit}>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <TextField
                        label='Tuotteen tiedot'
                        placeholder='Esim: Labratakki, valkoinen, koko s'
                        variant='outlined'
                        name='tuote'
                        type='text'
                        value={values.tuote}
                        onChange={(event) => setValues({ ...values, tuote: event.target.value })}
                    />
                </Grid>
                <Grid item sx={12} sm={6} md={6}>
                    <TextField
                        label='Hinta'
                        variant='outlined'
                        name='hinta'
                        type='text'
                        value={values.hinta}
                        onChange={(event) => setValues({ ...values, hinta: event.target.value })}
                    />
                </Grid>
                <Grid item sx={12} sm={6} md={6}>
                    <TextField
                        label='Lkm'
                        variant='outlined'
                        name='lkm'
                        type='number'
                        value={values.lkm}
                        onChange={(event) => setValues({ ...values, lkm: event.target.value })}
                    />
                </Grid>
                <button type='submit'>Lisää tuote</button>
            </form>
            <ul>
                {tuoteTiedot.map((t) => <li key={t.tuote}>{t.tuote}</li>)}
            </ul>
        </Grid>
    );
}

export default TuoteTiedotForm;