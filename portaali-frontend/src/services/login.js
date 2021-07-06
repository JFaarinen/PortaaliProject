import axios from 'axios';
const baseUrl = '/api/login';

const login = async kirjautumisTiedot => {
    const res = await axios.post(baseUrl, kirjautumisTiedot);
    return res.data;
}

export default { login }