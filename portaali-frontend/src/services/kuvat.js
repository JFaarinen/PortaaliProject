import axios from 'axios';
const baseUrl = '/api/tuotteet/upload/';

let token = null;

const lisaaToken = uusiToken => {
    token = `bearer ${uusiToken}`
}

const getAll = () => {
    return axios.get(baseUrl);
}

const upload = async (tuoteId, uusiKuva) => {
    const config = {
        headers: { Authorization: token, ContentType: 'multipart/form-date' }
    }
    const res = await axios.put(`${baseUrl}/${tuoteId}`, uusiKuva, config);
    return res.data;
}

export default { getAll, upload, lisaaToken }