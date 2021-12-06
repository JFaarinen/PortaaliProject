import * as kuvaConstants from '../constants/kuvaConstants';
import kuvaService from '../../services/kuvat';

export const lisaaKuva = (tuoteId, kuva) => {
    console.log(`lisätään kuva id:${tuoteId} kuva${kuva}`);
    return async dispatch => {
        const uusiKuva = await kuvaService.upload(tuoteId, kuva);
        dispatch({
            type: kuvaConstants.UUSI_KUVA,
            data: uusiKuva
        });
    }
}

export const poistaKuva = (id) => {
    return {
        type: kuvaConstants.POISTA_KUVA,
        data: { id }
    }
}

export const noudaKuvat = () => {
    return async dispatch => {
        const kuvat = await kuvaService.getAll();
        dispatch({
            type: kuvaConstants.ALUSTA_KUVAT,
            data: kuvat
        });
    }
}