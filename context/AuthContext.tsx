import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useState } from "react";
import useGetAllUsersData from "../hooks/useAllUsersData";

type AuthContextType = {
  isAuth: boolean;
  // userData: {
  //   email: string;
  //   name: string;
  // } | null;
  setAuth: (isAuth: boolean) => void;
  // setUserData: ({ email, name }: { email: string; name: string }) => void;
  auth: ({ email, password }: { email: string; password: string }) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuth, setAuth] = useState(false);
  // const [userData, setUserData] = useState<AuthContextType["userData"] | null>(null);
  const allUsers = useGetAllUsersData();
  const { push } = useRouter();

  function auth({ email, password }: { email: string; password: string }) {
    const user = allUsers.find(
      (element) => element.email === email && element.password === password
    );
    
    if (user) {
      setAuth(true);
      push('/')
    }
  }

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, auth }}>
      {children}
    </AuthContext.Provider>
  );
}
