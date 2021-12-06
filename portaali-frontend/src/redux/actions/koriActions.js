import * as koriConstants from '../constants/koriConstants';
import axios from 'axios';

export const lisaaKoriin = (id, lkm) => async (dispatch, getState) => {
    const { tuoteData } = await axios.get(`/api/tuotteet/${id}`);

    dispatch({
        type: koriConstants.LISAA_TUOTE,
        data: {
            
        }
    })
}