"use client";

import { useState, createContext, ReactNode, useEffect, use } from "react";
import { User } from "@/lib/db/schema";

export interface AuthContextProps {
  auth: User | null;
  setAuth: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<User | null>;
}) => {
  const initialUser = use(userPromise);
  const [auth, setAuth] = useState<User | null>(initialUser);

  useEffect(() => {
    setAuth(initialUser);
  }, [initialUser]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
