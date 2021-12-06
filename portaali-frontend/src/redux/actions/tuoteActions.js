import * as tuoteConstants from '../constants/tuoteConstants';
import tuoteService from '../../services/tuotteet';

export const lisaaTuote = (uusiTuote) => {
    return {
        type: tuoteConstants.UUSI_TUOTE,
        data: uusiTuote
    }
}

export const poistaTuote = (id) => {
    return {
        type: tuoteConstants.POISTA_TUOTE,
        data: { id }
    }
}

export const alustaTuotteet = () => {
    return async dispatch => {
        const tuotteet = await tuoteService.getAll();
        //console.log('kannasta noudetut tuotteet', tuotteet);
        dispatch({
            type: tuoteConstants.ALUSTA_TUOTTEET,
            data: tuotteet
        });
    };
};

export const paivitaTuote = (id, tuote) => {
    return async dispatch => {
        const paivTuote = await tuoteService.update(id, tuote);
        dispatch({
            type: tuoteConstants.PAIVITA_TUOTE,
            data: paivTuote
        });
    };
};