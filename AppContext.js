import React, { useEffect, useState } from "react";
import AxiosInstance from "./network/AxiosInstance";
const AppContext = React.createContext();

const AppProvier = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [birhdayData, setBirhdayData] = useState([]);
  const [userData, setUserData] = useState({}); //[{},{}
  const [dropdownData, setDropdownData] = useState([]);
  const getDropdownData = async () => {
    try {
      const data = await AxiosInstance().get("dropdown/");
      data && setDropdownData(data);
    } catch (err) {
      console.log({ ...err });
    }
  };
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
    getDropdownData();
  }, []);
  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, birhdayData,userData, setUserData, dropdownData }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvier;
export { AppContext };