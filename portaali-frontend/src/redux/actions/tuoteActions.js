import * as tuoteActions from '../constants/tuoteConstants';
import tuoteService from '../../services/tuotteet';

export const lisaaTuote = (uusiTuote) => {
    return {
        type: tuoteActions.UUSI_TUOTE,
        data: uusiTuote
    }
}

export const poistaTuote = (id) => {
    return {
        type: tuoteActions.POISTA_TUOTE,
        data: { id }
    }
}

export const alustaTuotteet = () => {
    return async dispatch => {
        const tuotteet = await tuoteService.getAll();
        //console.log('kannasta noudetut tuotteet', tuotteet);
        dispatch({
            type: tuoteActions.ALUSTA_TUOTTEET,
            data: tuotteet
        });
    };
};

export const paivitaTuote = (id, tuote) => {
    return async dispatch => {
        const paivTuote = await tuoteService.update(id, tuote);
        dispatch({
            type: tuoteActions.PAIVITA_TUOTE,
            data: paivTuote
        });
    };
};