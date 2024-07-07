import React, { useEffect, useState } from "react";
import AxiosInstance from "./network/AxiosInstance";
const AppContext = React.createContext();

const AppProvier = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [birhdayData, setBirhdayData] = useState([]);
  
  const getFamilyData = async () => {
    try {
      const data = await AxiosInstance().get("birthdays/");
      data && setBirhdayData(data);
      console.log(data.notification);
    } catch (err) {
      console.log({ ...err });
    }
  };
  useEffect(() => {
    getFamilyData();
  }, []);
  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, birhdayData}}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvier;
export { AppContext };