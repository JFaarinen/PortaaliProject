import * as koriConstants from '../constants/koriConstants';

export const koriReducer = (state = {tuotteetKorissa: []}, action) => {
    switch (action.type) {
        case koriConstants.LISAA_TUOTE:
            const tuote = action.data;
            const tuoteLoytyy = state.tuotteetKorissa.find((t) => t.malliId === tuote.malliId);

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
                tuotteetKorissa: state.tuotteetKorissa.filter((t) => t.malliId !== action.data)
            };
        
        case koriConstants.TYHJENNA_KORI:
            return {
                ...state,
                tuotteetKorissa: []
            };
        
        case koriConstants.MUUTA_VARAUSLKM:
            const {id, lkm} = action.data;
            const muutettavaTuote = state.tuotteetKorissa.find((t) => t.malliId === id);
            const muutettuTuote = {...muutettavaTuote, varausLkm: lkm};
            return {
                ...state, 
                tuotteetKorissa: state.tuotteetKorissa.map((t) => 
                t.malliId === muutettuTuote.malliId
                ? muutettuTuote 
                : t)
            };

        default: 
            return state;
    }
}