import * as tuoteConstants from '../constants/tuoteConstants';

export const tuoteReducer = (state = [], action) => {
    //console.log('reducer action', action);
    switch (action.type) {
        case tuoteConstants.UUSI_TUOTE:
            return [...state, action.data];
        case tuoteConstants.POISTA_TUOTE:
            const poistettava = action.data.id;
            return state.filter(t => t.id !== poistettava);
        case tuoteConstants.ALUSTA_TUOTTEET:
            return action.data;
        case tuoteConstants.PAIVITA_TUOTE:
            return state.map(t => t.id !== action.data.id ? t : action.data);
        default:
            return state;
    }
}