import * as tuoteActions from '../constants/tuoteConstants';

export const tuoteReducer = (state = [], action) => {
    //console.log('reducer action', action);
    switch (action.type) {
        case tuoteActions.UUSI_TUOTE:
            return [...state, action.data];
        case tuoteActions.POISTA_TUOTE:
            const poistettava = action.data.id;
            return state.filter(t => t.id !== poistettava);
        case tuoteActions.ALUSTA_TUOTTEET:
            return action.data;
        case tuoteActions.PAIVITA_TUOTE:
            return state.map(t => t.id !== action.data.id ? t : action.data);
        default:
            return state;
    }
}