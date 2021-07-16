import axios from 'axios';
const baseUrl = '/api/tuotteet/upload/';

let token = null;

const lisaaToken = uusiToken => {
    token = `bearer ${uusiToken}`
}

const getAll = () => {
    return axios.get(baseUrl);
}

const create = async (uusiKuva, tuotteenId) => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(`${baseUrl}/${tuotteenId}`, uusiKuva, config);
    return res.data;
}

export default { getAll, create, lisaaToken }