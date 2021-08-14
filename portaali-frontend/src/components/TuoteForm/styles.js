import { makeStyles, alpha } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid red'
    },

    form: {
        marginTopp: theme.spacing(3),
        border: '1px solid blue'
    }


}));