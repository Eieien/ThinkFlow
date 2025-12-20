import axios, { type AxiosInstance } from 'axios';

const axiosPublic : AxiosInstance = axios.create({
    baseURL: 'https://thinkflow-api.dcism.org/api/'
});
export const axiosPrivate : AxiosInstance = axios.create({
    baseURL: 'https://thinkflow-api.dcism.org/api/'
});

export default axiosPublic;