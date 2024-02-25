import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import useApi from "./useApi";
import { signIn } from "../api/account/account";
import accountApi from "../api/account";
import { removeToken, retrieveToken, storeToken } from "../auth/token";
import { Alert } from "react-native";

export default function useAuth() {
  // @ts-ignore
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState(false);

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
    if (userInfo) {
      setUser(userInfo);
      // @ts-ignore
      setError(null);
    }
  }

  async function logOut() {
    setUser(null);
    removeToken();
  }

  async function logIn(email: string, password: string) {
    try {
      const { account, token } = await accountApi.signIn(email, password);

      if (!account || !token) {
        throw new Error("Unable to sign in");
      }

      await storeToken(token);

      setUser(account);
      // @ts-ignore
      setError(null);
    } catch (e) {
      // @ts-ignore
      setError(e.message);
      console.log(e);

      // @ts-ignore
      Alert.alert(e.message);
    }
  }

  return { user, setUser, logIn, logOut, restoreUser, error };
}
