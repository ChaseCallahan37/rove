import { createContext, useState } from "react";
import { Account } from "../api/account/account";

const AuthContext = createContext<{
  user: Account | null;
  setUser: React.Dispatch<React.SetStateAction<Account | null>>;
} | null>(null);
AuthContext.displayName = "AuthContext";

export default AuthContext;
