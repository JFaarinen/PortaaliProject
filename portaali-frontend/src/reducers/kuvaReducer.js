import kuvaService from '../services/kuvat';

const kuvaReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case 'UUSI_KUVA':
            return state.concat(action.data);
        case 'POISTA_KUVA':
            const poistettava = action.data.id;
            return state.filter(t => t.id !== poistettava);
        default:
            return state;
    }
}

export const lisaaKuva = (tuoteId, kuva) => {
    console.log(`lisätään kuva id:${tuoteId} kuva${kuva}`);
    return async dispatch => {
        const uusiKuva = await kuvaService.upload(tuoteId, kuva);
        dispatch({
            type: 'UUSI_KUVA',
            data: uusiKuva
        });
    }
}

export const poistaKuva = (id) => {
    return {
        type: 'POISTA_KUVA',
        data: { id }
    }
}

export const noudaKuvat = () => {
    return async dispatch => {
        const kuvat = await kuvaService.getAll();
        dispatch({
            type: 'ALUSTA_TUOTTEET',
            data: kuvat
        });
    }
}

export default kuvaReducer;