const tuoteReducer = (state = [], action) => {
    switch(action.type) {
        case 'UUSI_TUOTE':
            return state.concat(action.data);
        case 'POISTA_TUOTE':
            const poistettava = action.data.id;
            return state.filter(t => t.id !== poistettava);
        default:
            return state;
    }
}

export const lisaaTuote = (tuote) => {
    return {
        type: 'UUSI_TUOTE',
        data: {

        }
    }
}

export const poistaTuote = (id) => {
    return {
        type: 'POISTA_TUOTE',
        data: { id }
    }
}

export default tuoteReducer;