import React, { useEffect, useState } from "react";
import AxiosInstance from "./network/AxiosInstance";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [birthdayData, setBirthdayData] = useState({ data: [], notification: { count: 0 } });
  const [deathData, setDeathData] = useState({ data: [], notification: { count: 0 } });
  const [weddingData, setWeddingData] = useState({ data: [], notification: { count: 0 } });
  const [userData, setUserData] = useState({});
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
      const birthdayResponse = await AxiosInstance().get("birthdays/");
      birthdayResponse && setBirthdayData(birthdayResponse);

      const deathResponse = await AxiosInstance().get("deathday/");
      deathResponse && setDeathData(deathResponse);

      const weddingResponse = await AxiosInstance().get("weddingdays/");
      weddingResponse && setWeddingData(weddingResponse);

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
      value={{ 
        isLoading, 
        setIsLoading, 
        birthdayData, 
        deathData, 
        weddingData,
        userData, 
        setUserData, 
        dropdownData 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { AppContext };