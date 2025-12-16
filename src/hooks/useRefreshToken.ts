import useAuth from './useAuth';
import axiosPublic from '@/api/axiosInstances';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const res = await axiosPublic.get(
            'auth/refresh',
            { withCredentials: true }
        );
        setAuth(() => {
            return {...res.data}
        });
        return res.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;