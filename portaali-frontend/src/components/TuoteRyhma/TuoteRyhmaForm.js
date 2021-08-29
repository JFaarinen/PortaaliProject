import React, { useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import useStyles from './styles';

const TuoteRyhmaForm = () => {
    const [tuoteRyhma, setTuoteryhma] = useState('');
    const classes = useStyles();

    const lisaaTuoteryhma = (event) => {
        event.preventDefault();
    }

    return (
        <Container className={classes.mainContainer}>
            <form onSubmit={lisaaTuoteryhma}>


            </form>
        </Container>
    )
}

export default TuoteRyhmaForm;