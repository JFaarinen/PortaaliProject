import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    media: {
        border: '1px solid #171717'
    },

    card: {
        height: 350,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '6px',
        position: 'relative'
    },

    content: {
        height: '60 px'
    },

    cardActions: {
        height: '60 px',
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    }


});