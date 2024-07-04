import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refresh");
    const response = await axios.post("https://api.lehungba.com/api/token/refresh/", { refresh: refreshToken??'rf' });
    const newAccessToken = response.data.access;
    await AsyncStorage.setItem("access", newAccessToken );
    return newAccessToken;
  } catch (err) {
    return Promise.reject(err);
  }
};

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: "https://api.lehungba.com/api/",
  });
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("access");
      config.headers = {
        Accept: "application/json",
        "Content-Type": contentType,
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
      const originalRequest = err.config;
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          console.log("refreshToken");
          const newToken = await refreshToken();
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (tokenRefreshError) {
          return console.log(tokenRefreshError);
        }
      }
      console.log(err);
    }
  );

  return axiosInstance;
};

export default AxiosInstance;
