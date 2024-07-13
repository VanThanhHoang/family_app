import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'https://api.lehungba.com/api/',
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem('access');
            config.headers = {
                'Accept': 'application/json',
                'Content-Type': contentType,
            };
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        (res) => res.data,
        async (err) => {
            const originalConfig = err.config;

            if (err.response) {
                // Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const refreshToken = await AsyncStorage.getItem('refresh');
                        const rs = await axiosInstance.post('/token/refresh/', {
                            refresh: refreshToken,
                        });
                        console.log('rs', rs);
                        const { access } = rs;
                        await AsyncStorage.setItem('access', access);

                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );

    return axiosInstance;
};

export default AxiosInstance;
