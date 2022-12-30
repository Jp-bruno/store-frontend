import { createContext, PropsWithChildren, useState } from "react";

type AuthContextType = {
  isAuth: boolean;
  userData: {
    email: string;
    name: string;
  } | null;
  setAuth: (isAuth: boolean) => void;
  setUserData: ({ email, name }: { email: string; name: string }) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuth, setAuth] = useState(false);
  const [userData, setUserData] = useState<AuthContextType["userData"] | null>(null);

  return (
    <AuthContext.Provider value={{ isAuth, userData, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
