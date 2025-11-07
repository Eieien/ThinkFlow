import { useEffect } from 'react';
import { axiosPrivate } from '@/api/axiosInstances';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Attaching interceptors...');
        const reqIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                console.log('Request Interceptor Hit');
                if(!config?.headers.Authorization){
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`
                }
                return config;
            },
            (error) => {
                console.log('Request Interceptor Error');
                return Promise.reject(error);
            }
        );
        const resIntercept = axiosPrivate.interceptors.response.use(
            (res) => {
                console.log('Response Interceptor Success');
                return res;
            },
            async (error) => {
                console.log('Response Interceptor Error');
                const prevReq = error?.config;
                if(error?.response?.status === 401 && !prevReq?.sent){
                    try {
                        prevReq.sent = true;
                        const newAccessToken = await refresh();
                        prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevReq);
                    } catch (err) {
                        navigate('/login');
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(reqIntercept);
            axiosPrivate.interceptors.response.eject(resIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate