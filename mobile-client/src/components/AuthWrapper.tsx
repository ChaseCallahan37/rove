import { useState } from "react";
import AuthContext from "../auth/context";
import { retrieveToken } from "../auth/token";
import accountApi from "../api/account";
import { Account } from "../api/account/account";

type AuthWrapperProps = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<Account | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
