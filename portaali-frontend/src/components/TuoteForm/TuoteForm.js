import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tuoteService from '../../services/tuotteet';
import { useHistory } from 'react-router';
import TuoteTiedotForm from './TuoteTiedot/TuoteTiedotForm';
import KuvaForm from './TuoteKuva/KuvaForm';
import HakusanaForm from '../HakusanaForm';
import { lisaaTuote } from '../../reducers/tuoteReducer';
import { Container, CssBaseline, Grid, TextField, Divider } from '@material-ui/core';
import useStyles from './styles';
import { Fragment } from 'react';

const TuoteForm = () => {
    const [hakusanat, setHakusanat] = useState([]);
    const [tuoteRyhma, setTuoteRyhma] = useState({ otsikko: '', kuvaus: '' });
    const [tuoteTiedot, setTuoteTiedot] = useState([]);
    const [kuvat, setKuvat] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();

    const lisaaHakusana = (hakusana) => {
        setHakusanat(hakusanat.concat(hakusana));
    }

    const handleTuoteLisays = async (event) => {
        event.preventDefault();
        const uusiTuote = {
            otsikko: tuoteRyhma.otsikko,
            kuvaus: tuoteRyhma.kuvaus,
            tuoteTiedot: tuoteTiedot,
            img: kuvat
        }
        setTuoteRyhma({ otsikko: '', kuvaus: '' });
        setTuoteTiedot([]);
        setKuvat([]);
        const lisattyTuote = await tuoteService.create(uusiTuote);
        dispatch(lisaaTuote(lisattyTuote));
    };

    return (
        <Fragment>
            <Container className={classes.mainContainer}>
                <CssBaseline />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form className={classes.form} id="tuoteForm" onSubmit={handleTuoteLisays}>
                            <Grid item xs={12}>
                                <TextField
                                    label='Tuote'
                                    className={classes.syotto}
                                    variant='outlined'
                                    name='tuoteNimi'
                                    fullWidth
                                    value={tuoteRyhma.otsikko}
                                    onChange={(e) => setTuoteRyhma({ ...tuoteRyhma, otsikko: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Tuotteen kuvaus'
                                    variant='outlined'
                                    name='tuoteKuvaus'
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={tuoteRyhma.kuvaus}
                                    onChange={(e) => setTuoteRyhma({ ...tuoteRyhma, kuvaus: e.target.value })}
                                />
                            </Grid>
                        </form>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TuoteTiedotForm tuoteTiedot={tuoteTiedot} setTuoteTiedot={setTuoteTiedot} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <KuvaForm kuvat={kuvat} setKuvat={setKuvat} />
                    </Grid>

                    <button type="submit" form="tuoteForm">Lisää tuote</button>
                    <div>
                        <div>
                            <label>Hakusanat:</label>
                        </div>
                        <div>
                            {hakusanat.map((k, id) => <li key={id}>{k}</li>)}
                        </div>
                    </div>
                </Grid>

            </Container>
        </Fragment>
    );
}
export default TuoteForm;

