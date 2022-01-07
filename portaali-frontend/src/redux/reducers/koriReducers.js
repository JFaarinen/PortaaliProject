import * as koriConstants from '../constants/koriConstants';

export const koriReducer = (state = {tuotteetKorissa: []}, action) => {
    switch (action.type) {
        case koriConstants.LISAA_TUOTE:
            const tuote = action.data;
            const tuoteLoytyy = state.tuotteetKorissa.find((i) => i.malliId === tuote.malliId);

            if (tuoteLoytyy) {
                return {
                    ...state, 
                    tuotteetKorissa: state.tuotteetKorissa.map((t) => 
                    t.malliId === tuoteLoytyy.malliId
                    ? tuote 
                    : t)
                }
            } else {
                return {
                    ...state, 
                    tuotteetKorissa: [...state.tuotteetKorissa, tuote]
                }
            };
        
        case koriConstants.POISTA_TUOTE:
            return {
                ...state, 
                tuotteetKorissa: state.tuotteetKorissa.filter((i) => i._id !== action.data)
            };
        
        case koriConstants.TYHJENNA_KORI:
            return {
                ...state,
                tuotteetKorissa: []
            };
        
        case koriConstants.MUUTA_VARAUSLKM:
            return {
                state
            }

        default: 
            return state;
    }
}