import axios from 'axios';

const url = "http://localhost:5000";

export const login = async (obj) => {
    const response = await axios.post(`${url}/auth/login`, obj);
    return response.data;
}

export const checkUsername = async (obj) => {
    const response = await axios.post(`${url}/users/check-username`, obj);
    return response.data;
}