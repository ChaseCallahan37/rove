import { useEffect, useState } from "react";
import AuthContext from "../auth/context";
import { retrieveToken } from "../auth/token";
import accountApi from "../api/account";
import { Account } from "../api/account/account";
import useAuth from "../hooks/useAuth";

type AuthWrapperProps = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: AuthWrapperProps) {
  const [account, setAccount] = useState<Account | null>(null);
  const { restoreAccountInfo } = useAuth();

  const handleRestoreUser = async () => {
    const accountInfo = await restoreAccountInfo();

    if (accountInfo) {
      setAccount(accountInfo);
    }
  };

  useEffect(() => {
    handleRestoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
