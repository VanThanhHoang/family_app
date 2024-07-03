import React, { useEffect, useState } from "react";
import AxiosInstance from "./network/AxiosInstance";
const AppContext = React.createContext();

const AppProvier = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [birhdayData, setBirhdayData] = useState([]);
  const [userData, setUserData] = useState({}); //[{},{}

  const getUserInfo = async () => {
    try {
      // {
      //     "full_name_vn": "Hoang Van Thanh",
      //     "birth_date": "2002-06-05",
      //     "gender": null,
      //     "phone_number": null,
      //     "address": null,
      //     "nationality": "Việt Nam",
      //     "marital_status": false,
      //     "occupation": null,
      //     "education_level": "dai hoc",
      //     "hobbies_interests": "q2a3",
      //     "social_media_links": null,
      //   }
      // only get properti like above obj
      const data = await AxiosInstance().get("/user-detail/update/");
      data &&
        setUserData({
          full_name_vn: data.full_name_vn,
          birth_date: data.birth_date,
          gender: data.gender,
          phone_number: data.phone_number,
          address: data.address,
          nationality: data.nationality,
          marital_status: data.marital_status,
          occupation: data.occupation,
          education_level: data.education_level,
          hobbies_interests: data.hobbies_interests,
          social_media_links: data.social_media_links,
        });
      console.log(data);
    } catch (err) {
      console.log(err);
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
    getUserInfo();
    getFamilyData();
  }, []);
  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, birhdayData,setUserData, userData }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvier;
export { AppContext };
