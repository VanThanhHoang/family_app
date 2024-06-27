import React, { useEffect, useState } from "react";
const AppContext = React.createContext();

const AppProvier = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading}}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvier;
export { AppContext };
