import { Container, Grid, Typography, TextField, Button } from '@material-ui/core';
import React, { useState, Fragment } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';

const KuvaForm = ({ kuvat, setKuvat }) => {
    const classes = useStyles();
    const [values, setValues] = useState({ otsikko: '', kuvaus: '', kuvatiedosto: '', etusivu: false });
    const [newImage, setNewImage] = useState('');
    const [error, setError] = useState('');

    const lisaaKuvat = (event) => {
        event.preventDefault();
        const otsikot = kuvat.map(k => k.otsikko);
        if (otsikot.includes(values.otsikko)) {
            setError('virhe: otsikon tulee olla uniikki!')
        } else {
            setKuvat(kuvat.concat({
                otsikko: values.otsikko,
                kuvaus: values.kuvaus,
                kuvatiedosto: newImage,
                etusivu: kuvat.length > 1 ? false : true
            }));
            setValues({ otsikko: '', kuvaus: '', kuvatiedosto: '', etusivu: false });
            setError('');
            setNewImage('');
        }
    }

    const poistaKuva = (otsikko) => {
        setKuvat(kuvat.filter(k => k.otsikko !== otsikko));
    }

    return (
        <Container className={classes.mainContainer}>
            <Grid container alignItems='center' spacing={1}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h4">Kuvien lisääminen: </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {error}
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label='Otsikko'
                        variant='outlined'
                        name='otsikko'
                        type='text'
                        fullWidth
                        value={values.otsikko}
                        onChange={(event) => setValues({ ...values, otsikko: event.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label='Kuvaus'
                        variant='outlined'
                        name='kuvaus'
                        type='text'
                        fullWidth
                        value={values.kuvaus}
                        onChange={(event) => setValues({ ...values, kuvaus: event.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className={classes.fileBaseObject}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => {
                                console.log('base64:', base64);
                                setNewImage(base64);
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={(e) => lisaaKuvat(e)}>
                        Lisää kuva
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <div>Kuvat tuotteesta: {kuvat.length}</div>
                    <ul>
                        {kuvat.map((k) =>
                            <li key={k.otsikko}>
                                {k.otsikko} <Button onClick={() => poistaKuva(k.otsikko)}>poista</Button>
                            </li>)}
                    </ul>
                </Grid>
            </Grid>
        </Container>
    )
}

export default KuvaForm;
