import tuoteService from '../services/tuotteet';

const tuoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'UUSI_TUOTE':
            return state.concat(action.data);
        case 'POISTA_TUOTE':
            const poistettava = action.data.id;
            return state.filter(t => t.id !== poistettava);
        case 'ALUSTA_TUOTTEET':
            return action.data;
        default:
            return state;
    }
}

export const lisaaTuote = (uusiTuote) => {
    return {
        type: 'UUSI_TUOTE',
        data: uusiTuote
    }
}

export const poistaTuote = (id) => {
    return {
        type: 'POISTA_TUOTE',
        data: { id }
    }
}

export const alustaTuotteet = () => {
    return async dispatch => {
        const tuotteet = await tuoteService.getAll();
        dispatch({
            type: 'ALUSTA_TUOTTEET',
            data: tuotteet
        });
    }
}

export default tuoteReducer;