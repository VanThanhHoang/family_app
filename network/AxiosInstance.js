import axios from "axios";
import { Platform } from "react-native";

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: "https://api.lehungba.com/",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      // const token = await AsyncStorage.getItem('token');
      config.headers = {
        Accept: "application/json",
        "Content-Type": contentType,
      };
      //Authorization: `Bearer ${""}`,

      return config;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
  );
  return axiosInstance;
};

export default AxiosInstance;
