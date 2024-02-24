import { useContext } from "react";
import AuthContext from "../auth/context";
import useApi from "./useApi";
import { signIn } from "../api/account/account";
import accountApi from "../api/account";
import { removeToken, retrieveToken, storeToken } from "../auth/token";

export default function useAuth() {
  // @ts-ignore
  const { user, setUser } = useContext(AuthContext);

  if (!user) {
    restoreUser();
  }

  async function restoreUser() {
    const token = await retrieveToken();

    if (!token) return;

    //@ts-ignore
    const userInfo = await accountApi.getAccountInfo(token);

    if (!userInfo) return;

    // @ts-ignore
    if (userInfo) setUser(userInfo);
  }

  async function logOut() {
    setUser(null);
    removeToken();
  }

  async function logIn(email: string, password: string) {
    const { account, token } = await accountApi.signIn(email, password);

    if (!account || !token) return;

    await storeToken(token);

    setUser(account);
  }

  return { user, setUser, logIn, logOut, restoreUser };
}
