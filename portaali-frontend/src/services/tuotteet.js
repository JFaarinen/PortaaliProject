import axios from 'axios';
const baseUrl = '/api/tuotteet';

let token = null;

const lisaaToken = uusiToken => {
    token = `bearer ${uusiToken}`
}

const getAll = () => {
    return axios.get(baseUrl);
}

const create = async uusiTuote => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(baseUrl, uusiTuote, config);
    return res.data;
}

const update = (id, uusiTuote) => {
    return axios.put(`${baseUrl}/${id}`, uusiTuote);
}

export default { getAll, create, update, lisaaToken }