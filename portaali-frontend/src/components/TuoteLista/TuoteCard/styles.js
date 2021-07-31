import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    media: {
        maxHeight: '200',
        maxWidth: '200',
        paddingTop: '56,25%',
        marginTop: '30',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken'
    },

    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative'
    },

    content: {
        height: 60
    },

    cardActions: {
        height: 60,
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    }


});