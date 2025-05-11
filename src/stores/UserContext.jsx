import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   setUser({
  //     userid: 0,
  //     name: "홍길동",
  //     email: "honggildong@gmail.com",
  //     currentStorage: 4.0 * 1024 * 1024 * 1024,
  //     maxStorage: 10.0 * 1024 * 1024 * 1024,
  //     isAlarm: true,
  //   });
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
