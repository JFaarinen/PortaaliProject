import React from 'react';
import TuoteCard from './TuoteCard/TuoteCard';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const TuoteLista = () => {
    const tuotteet = useSelector(state => state.tuotteet);
    const classes = useStyles();
    console.log(tuotteet);

    return (
        !tuotteet.length
            ? <CircularProgress />
            : (
                <Grid
                    className={classes.container}
                    container
                    alignItems="stretch"
                    justifyContent="space-evenly"
                    spacing={2}>
                    {tuotteet.map((tuote) => (
                        <Grid key={tuote.id} item xs={12} sm={4} md={3} lg={2}>
                            <TuoteCard tuote={tuote} />
                        </Grid>
                    ))}
                </Grid>
            )
    );
}

export default TuoteLista;