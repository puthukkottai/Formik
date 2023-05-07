import React, { createContext, useState } from "react";

export const MyContext1 = createContext();

export const MyProvider1 = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <MyContext1.Provider value={{ data, setData }}>
      {children}
    </MyContext1.Provider>
  );
};
