import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@material-ui/core';
import useStyles from './styles'
import { Link } from 'react-router-dom';

const TuoteCard = ({ tuote }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                component="img"
                height="200"
                image={tuote.img[0].kuvatiedosto || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={tuote.otsikko}
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {tuote.kuvaus}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Link to={`/tuotteet/${tuote.id}`}>
                    Lisätiedot
                </Link>
            </CardActions>
        </Card>
    );
}

export default TuoteCard;