import React, { useState } from 'react';
import { Grid, TextField, Button, Container } from '@material-ui/core';
import useStyles from './styles';

const TuoteTiedotForm = ({ tuoteTiedot, setTuoteTiedot }) => {
    const classes = useStyles();
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
        <Container className={classes.mainContainer}>

            <form onSubmit={handleSubmit}>
                <Grid container alignItems='center' spacing={1}>
                    <Grid item sx={12} sm={12}>
                        <TextField
                            label='Tuotteen tiedot'
                            variant='outlined'
                            name='tuote'
                            type='text'
                            fullWidth
                            value={values.tuote}
                            onChange={(event) => setValues({ ...values, tuote: event.target.value })}
                        />
                    </Grid>
                    <Grid item sx={12} sm={6}>
                        <TextField
                            label='Hinta'
                            variant='outlined'
                            name='hinta'
                            type='text'
                            value={values.hinta}
                            onChange={(event) => setValues({ ...values, hinta: event.target.value })}
                        />
                    </Grid>
                    <Grid item sx={12} sm={6}>
                        <TextField
                            label='Lkm'
                            variant='outlined'
                            name='lkm'
                            type='number'
                            value={values.lkm}
                            onChange={(event) => setValues({ ...values, lkm: event.target.value })}
                        />
                    </Grid>
                </Grid>
                <button type='submit'>Lisää tuote</button>
            </form>
            <ul>
                {tuoteTiedot.map((t) => <li key={t.tuote}>{t.tuote}</li>)}
            </ul>
        </Container>
    );
}

export default TuoteTiedotForm;