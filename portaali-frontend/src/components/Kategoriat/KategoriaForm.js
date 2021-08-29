import React, { useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
            const uusi = kategoriat.concat(uusiKategoria);
            console.log(uusi);
            setKategoriat(uusi);
            console.log(kategoriat);
            setUusiKategoria('');
        }
    }

    return (
        <Container className={classes.mainContainer}>
            <Grid container spacing={1}>
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
                <Typography variant="h4">Kategoriat: </Typography>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Kategoria</TableCell>
                                <TableCell>Poista</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kategoriat.map((k) => (
                                <TableRow key={k}>
                                    <TableCell>
                                        {k}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => { }}>
                                            {DeleteIcon}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    )
}

export default KategoriaForm;