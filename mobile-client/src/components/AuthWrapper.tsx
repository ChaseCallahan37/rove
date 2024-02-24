import { useState } from "react";
import AuthContext from "../auth/context";
import { retrieveToken } from "../auth/token";
import accountApi from "../api/account";

// @ts-ignore
function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);

  // @ts-ignore
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
