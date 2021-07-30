import React from 'react';
import TuoteCard from './TuoteCard';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const TuoteLista = () => {
    const tuotteet = useSelector(state => state.tuotteet);
    console.log(tuotteet);

    return (
        !tuotteet.length
            ? <CircularProgress />
            : (
                <Grid className={null} container alignItems="stretch" spacing={3}>
                    {tuotteet.map((tuote) => (
                        <Grid key={tuote.id} item xs={12} sm={6} md={4}>
                            <TuoteCard tuote={tuote} />
                        </Grid>
                    ))}
                </Grid>
            )
    );
}

export default TuoteLista;