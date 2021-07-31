import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    media: {
        height: '120px',
        paddingTop: '56,25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken'
    },

    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '210px',
        position: 'relative'
    },

    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    }


});