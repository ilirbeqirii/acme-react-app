import React, { useState } from "react";
import { User } from "./user.model";
import * as authProvider from "./auth-provider";

type AuthContextType = [
  User | null,
  () => boolean,
  () => Promise<void>,
  (firstname: string, password: string) => Promise<void>,
  (firstname: string, password: string) => void
];

const AuthContext = React.createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

function getUserData() {
  const user = authProvider.getUser();

  if (user) {
    return user;
  }

  return null;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(() => getUserData());

  const isLoggedIn = React.useCallback(() => !!user, [user]);

  const logout = React.useCallback(async () => {
    setUser(null);

    await authProvider.logout();
  }, [setUser]);

  const login = React.useCallback(
    async (username: string, password: string) => {
      console.log(password);

      await authProvider.login(username, password).then((user: User) => {
        setUser(user);
      });
    },
    [setUser]
  );

  const register = React.useCallback(
    (username: string, password: string) => {
      console.log(password);

      authProvider.register(username, password).then((user) => {
        setUser(user);
      });
    },
    [setUser]
  );

  const value = [user, isLoggedIn, logout, login, register] as AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
