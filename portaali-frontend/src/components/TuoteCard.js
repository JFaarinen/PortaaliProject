import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@material-ui/core';

const TuoteCard = ({ tuote }) => {
    return (
        <Card className={null}>
            <CardMedia
                className={null}
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
            <CardActions>
                <Button size="small" color="primary" onClick={() => { }}>
                    Lisätiedot
                </Button>
            </CardActions>
        </Card>
    );
}

export default TuoteCard;