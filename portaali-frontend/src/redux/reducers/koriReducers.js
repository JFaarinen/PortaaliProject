import * as koriConstants from '../constants/koriConstants';

export const koriReducer = (state = {kori: []}, action) => {
    switch (action.type) {
        case koriConstants.LISAA_TUOTE:
            const tuote = action.data;
            const tuoteKorissa = state.kori.find((i) => i.id === tuote.id);

            if (tuoteKorissa) {
                return {
                    ...state, 
                    kori: state.kori.map((t) => t.id === tuoteKorissa.id
                    ? tuote 
                    : t)
                }
            } else {
                return {
                    ...state, 
                    kori: [...state.kori, tuote]
                }
            };
        
        case koriConstants.POISTA_TUOTE:
            return {
                ...state, 
                kori: state.kori.filter((i) => i._id !== action.data)
            };
        
        case koriConstants.TYHJENNA_KORI:
            return {
                ...state,
                kori: []
            };

        default: 
            return state;
    }
}