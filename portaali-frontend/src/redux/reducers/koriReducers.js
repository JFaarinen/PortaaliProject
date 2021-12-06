import * as koriConstants from '../constants/koriConstants';

export const koriReducer = (state = {korinTuotteet: []}, action) => {
    switch (action.type) {
        case koriConstants.LISAA_TUOTE:
            const tuote = action.data;
            const tuoteKorissa = state.korinTuotteet.find((i) => i._id === tuote._id);

            if (tuoteKorissa) {
                return {
                    ...state, 
                    korinTuotteet: state.korinTuotteet.map((t) => t._id === tuoteKorissa._id
                    ? tuote 
                    : x)
                }
            } else {
                return {
                    ...state, 
                    korinTuotteet: [...korinTuotteet, tuote]
                }
            }
        
        case koriConstants.POISTA_TUOTE:
            return {
                ...state, 
                korinTuotteet: state.korinTuotteet.filter((i) => i._id !== action.data)
            }
        default: 
            return state;
    }
}