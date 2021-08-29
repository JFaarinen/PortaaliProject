import React, { useState } from 'react';
import { Container, TextField, Typography, Button } from '@material-ui/core';
import useStyles from './styles';

const KategoriaForm = () => {
    const [kategoriat, setKategoriat] = useState([]);
    const [uusiKategoria, setUusiKategoria] = useState('');
    const classes = useStyles();

    const lisaaKategoria = (event) => {
        event.preventDefault();
        if (kategoriat.includes(uusiKategoria)) {
            console.log('Virhe, löytyy jo listasta!')
        } else {
            setKategoriat(kategoriat.concat(uusiKategoria));
            setUusiKategoria('');
        }
    }

    return (
        <Container className={classes.mainContainer}>
            <form onSubmit={lisaaKategoria}>
                <Typography variant="h3">Lisää kategoria: </Typography>
                <TextField
                    label='Kategoria'
                    className={classes.syotto}
                    variant='outlined'
                    name='kategoria'
                    fullWidth
                    value={uusiKategoria}
                    onChange={(event) => setUusiKategoria(event.target.value)}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                >Lisää kategoria</Button>
            </form>

        </Container>
    )
}

export default KategoriaForm;