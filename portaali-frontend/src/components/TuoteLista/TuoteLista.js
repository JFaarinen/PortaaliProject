import React, { Fragment } from 'react';
import TuoteCard from './TuoteCard/TuoteCard';
import { Grid, CircularProgress, Paper } from '@material-ui/core';
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
                        alignItems="stretch"
                        justifyContent="space-around"
                        spacing={3}>
                        {tuotteet.map((tuote) => (
                            <Grid key={tuote.id} item xs={7} sm={5} md={3} lg={2}>
                                <TuoteCard tuote={tuote} />
                            </Grid>
                        ))}
                    </Grid>
                </div>

            )
    );
}

export default TuoteLista;