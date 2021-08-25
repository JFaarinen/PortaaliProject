import React, { useState } from 'react';
import { Grid, TextField, Button, Container, Typography } from '@material-ui/core';
import useStyles from './styles';

const TuoteTiedotForm = ({ tuoteTiedot, setTuoteTiedot }) => {
    const classes = useStyles();
    const [values, setValues] = useState({ tuote: '', hinta: 0, lkm: 1 });
    const [error, setError] = useState('');

    const lisaaVaihtoehto = (event) => {
        event.preventDefault();
        const tuotteet = tuoteTiedot.map(t => t.tuote);
        if (tuotteet.includes(values.tuote)) {
            setError('virhe: vaihtoehto on jo listassa!')
        } else {
            setTuoteTiedot(tuoteTiedot.concat({ tuote: values.tuote, hinta: values.hinta, lkm: values.lkm }));
            setValues({ tuote: '', hinta: 0, lkm: 1 });
        }
    }

    const poistaVaihtoehto = (tuote) => {
        setTuoteTiedot(tuoteTiedot.filter(t => t.tuote !== tuote));
    }


    return (
        <Container className={classes.mainContainer}>

            <div>
                <Grid container alignItems='center' spacing={1}>

                    <Grid item xs={12}>
                        <Typography variant="h4">Vaihtoehdot: </Typography>
                        {error}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Kuvaus'
                            variant='outlined'
                            name='tuote'
                            type='text'
                            fullWidth
                            value={values.tuote}
                            onChange={(event) => setValues({ ...values, tuote: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Hinta'
                            variant='outlined'
                            name='hinta'
                            type='text'
                            value={values.hinta}
                            onChange={(event) => setValues({ ...values, hinta: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Lkm'
                            variant='outlined'
                            name='lkm'
                            type='number'
                            value={values.lkm}
                            onChange={(event) => setValues({ ...values, lkm: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={(e) => lisaaVaihtoehto(e)}
                        >Lisää vaihtoehto</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <ul>
                            {tuoteTiedot.map((t) =>
                                <li key={t.tuote}>
                                    {t.tuote}, {t.hinta}€ lkm: {t.lkm}
                                    <Button onClick={() => poistaVaihtoehto(t.tuote)}>poista</Button>
                                </li>)}
                        </ul>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default TuoteTiedotForm;