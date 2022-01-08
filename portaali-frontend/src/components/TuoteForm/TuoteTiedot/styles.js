import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid red'
    },

    form: {
        width: '100%',
        marginTopp: theme.spacing(3),
        border: '1px solid blue'
    }


}));