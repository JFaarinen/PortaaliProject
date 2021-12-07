import * as koriConstants from '../constants/koriConstants';
import axios from 'axios';

export const lisaaKoriin = (tilaus) => async (dispatch, getState) => {
    dispatch({
        type: koriConstants.LISAA_TUOTE,
        data: tilaus
    });
};

export const poistaKorista = (id) => (dispatch, getState) => {
    dispatch({
        type: koriConstants.POISTA_TUOTE,
        data: id
    });
}

export const tyhjennaKori = () => (dispatch, getState) => {
    dispatch({
        type: koriConstants.TYHJENNA_KORI,
    });
};