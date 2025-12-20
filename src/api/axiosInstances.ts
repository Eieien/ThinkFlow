import axios, { type AxiosInstance } from 'axios';

const axiosPublic : AxiosInstance = axios.create({
    baseURL: 'http://localhost:20155/api'
});
export const axiosPrivate : AxiosInstance = axios.create({
    baseURL: 'http://localhost:20155/api'
});

export default axiosPublic;