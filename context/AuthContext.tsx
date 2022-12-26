import { createContext, PropsWithChildren, useState } from "react";

type AuthContextType = {};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuth, setAuth] = useState(false);
  const [userData, setUserData] = useState({});
  
  return <AuthContext.Provider value={{isAuth, userData}}>{children}</AuthContext.Provider>;
}
