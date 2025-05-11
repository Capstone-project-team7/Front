import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    // if (saved) setUser(JSON.parse(saved));

    // 임시 유저 값 세팅
    setUser({
      name: "홍길동",
      email: "honggildong@gmail.com",
      currentStorage: 22.0,
      maxStorage: 30.0,
      isAlarm: true,
      isFirst: true,
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
