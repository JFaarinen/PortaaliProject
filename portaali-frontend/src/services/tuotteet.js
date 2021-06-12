import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/tuotteet';

const getAll = () => {
    return axios.get(baseUrl);
}

const create = uusiTuote => {
    return axios.post(baseUrl, uusiTuote);
}

const update = (id, uusiTuote) => {
    return axios.put(`${baseUrl}/${id}`, uusiTuote);
}

export default { getAll, create, update }