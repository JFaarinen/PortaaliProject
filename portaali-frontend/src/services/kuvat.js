import axios from 'axios';
const baseUrl = '/api/kuvat';

let token = null;

const lisaaToken = uusiToken => {
    token = `bearer ${uusiToken}`
}

const getAll = () => {
    return axios.get(baseUrl);
}

const create = async uusiKuva => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(baseUrl, uusiKuva, config);
    return res.data;
}

export default { getAll, create, lisaaToken }