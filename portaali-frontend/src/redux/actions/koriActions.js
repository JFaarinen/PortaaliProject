import * as koriConstants from '../constants/koriConstants';

export const lisaaKoriin = (tilaus) => async (dispatch, getState) => {
    dispatch({
        type: koriConstants.LISAA_TUOTE,
        data: tilaus
    });
    localStorage.setItem('kori', JSON.stringify(getState().kori.tuotteetKorissa));
};

export const muutaVarausta = (id, lkm, getState) => async (dispatch, setState) => {
    dispatch({
        type: koriConstants.MUUTA_VARAUSLKM,
        data: {
            id: id,
            lkm: lkm
        }
    });
    localStorage.setItem('kori', JSON.stringify(getState().kori.tuotteetKorissa));
};

export const poistaKorista = (id) => (dispatch, getState) => {
    dispatch({
        type: koriConstants.POISTA_TUOTE,
        data: id
    });
    localStorage.setItem('kori', JSON.stringify(getState().kori.tuotteetKorissa));
};

export const tyhjennaKori = () => (dispatch, getState) => {
    dispatch({
        type: koriConstants.TYHJENNA_KORI,
    });
    localStorage.setItem('kori', JSON.stringify(getState().kori.tuotteetKorissa));
};