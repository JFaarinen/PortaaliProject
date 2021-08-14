import { Container, Grid, Typography, TextField } from '@material-ui/core';
import React, { useState, Fragment } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';

const KuvaForm = ({ kuvat, setKuvat }) => {
    const classes = useStyles();
    const [values, setValues] = useState({ otsikko: '', kuvaus: '', kuvatiedosto: '', etusivu: false });
    const [newImage, setNewImage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setKuvat(kuvat.concat({
            otsikko: values.otsikko,
            kuvaus: values.kuvaus,
            kuvatiedosto: newImage,
            etusivu: kuvat.length > 1 ? false : true
        }));
        setValues({ otsikko: '', kuvaus: '', kuvatiedosto: '', etusivu: false });
        setNewImage('');
    }

    return (
        <Container className={classes.mainContainer}>
            <Grid container alignItems='center' spacing={1}>
                <Grid item sx={12} sm={12}>
                    <Typography variant="h4">Kuvien lisääminen: </Typography>
                </Grid>
                <Grid item sx={12} sm={12}>
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
                <Grid item sx={12} sm={12}>
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
                <div className="card-body">
                    <div>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => {
                                console.log('base64:', base64);
                                setNewImage(base64);
                            }}
                        />
                    </div>
                    <div>
                        <div>Lisättävät kuvat</div>
                        <div>{kuvat.length}</div>
                    </div>
                    <button onClick={handleSubmit}>Lisää kuva</button>
                </div>

            </Grid>
        </Container>
    )
}

export default KuvaForm;
