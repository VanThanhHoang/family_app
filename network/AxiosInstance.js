import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; // Nhập Alert từ react-native

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'https://api.lehungba.com/api/',
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem('access');
            console.log('token', token);
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

// Thêm hàm để lấy CrmToken, sử dụng axios trực tiếp
export const getCrmToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('access');
        if (!accessToken) {
            throw new Error('Token không tồn tại');
        }

        const response = await axios.post(
            'https://crm.lehungba.com/api/login/', 
            { access: accessToken }, // Đảm bảo rằng bạn đang gửi token đúng cách trong body
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const { access: crmToken, refresh: crmRefreshToken, user } = response.data;
        await AsyncStorage.setItem('CrmToken', crmToken);
        await AsyncStorage.setItem('CrmRefreshToken', crmRefreshToken);
        await AsyncStorage.setItem('CrmUserId', user.id.toString());
        await AsyncStorage.setItem('CrmUserEmail', user.email);
        
        Alert.alert('Thành công', 'CRM token đã được lưu.');
    } catch (error) {
        console.error('Lỗi lấy CRM token:', error);
        Alert.alert('Lỗi', 'Không thể lấy CRM token.');
    }
};

export default AxiosInstance;
