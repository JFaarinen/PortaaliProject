const tuoteReducer = (state = [], action) => {
    switch(action.type) {
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

export const lisaaTuote = (tuote) => {
    return {
        type: 'UUSI_TUOTE',
        data: { tuote }
    }
}

export const poistaTuote = (id) => {
    return {
        type: 'POISTA_TUOTE',
        data: { id }
    }
}

export const alustaTuotteet = (tuotteet) => {
    return {
        type: 'ALUSTA_TUOTTEET',
        data: tuotteet
    }
}

export default tuoteReducer;