import axios, { type AxiosInstance } from 'axios';

const axiosPublic : AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});
export const axiosPrivate : AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default axiosPublic;