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

const TuoteCard = ({ tuote }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={tuote.img[0].kuvatiedosto || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={tuote.otsikko}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {tuote.kuvaus}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { }}>
                    Lisätiedot
                </Button>
            </CardActions>
        </Card>
    );
}

export default TuoteCard;