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
                <div className={classes.container}>

                    <Grid
                        className={classes.container}
                        container
                        alignItems='stretch'
                        justifyContent='space-around'
                        spacing={2}>
                        {tuotteet.map((tuote) => (
                            <Grid key={tuote.id} item xs={10} sm={6} md={4} lg={3}>
                                <TuoteCard tuote={tuote} />
                            </Grid>
                        ))}
                    </Grid>
                </div>

            )
    );
}

export default TuoteLista;