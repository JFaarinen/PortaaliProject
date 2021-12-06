import * as kuvaConstants from '../constants/kuvaConstants';

export const kuvaReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case kuvaConstants.UUSI_KUVA:
            return state.concat(action.data);
        case kuvaConstants.POISTA_KUVA:
            const poistettava = action.data.id;
            return state.filter(t => t.id !== poistettava);
        default:
            return state;
    }
}