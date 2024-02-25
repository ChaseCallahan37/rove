import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import useApi from "./useApi";
import { signIn } from "../api/account/account";
import accountApi from "../api/account";
import { removeToken, retrieveToken, storeToken } from "../auth/token";
import { Alert } from "react-native";

export default function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("Issue creting auth context");

  if (!authContext?.user) {
    restoreUser();
  }

  async function restoreUser() {
    const token = await retrieveToken();

    if (!token) return;

    //@ts-ignore
    const userInfo = await accountApi.getAccountInfo(token);

    if (!userInfo) return;

    if (userInfo) {
      // @ts-ignore
      authContext.setUser(userInfo);
      // @ts-ignore
      setError(null);
    }
  }

  async function logOut() {
    // @ts-ignore
    authContext.setUser(null);
    removeToken();
  }

  async function logIn(email: string, password: string) {
    try {
      const { account, token } = await accountApi.signIn(email, password);

      if (!account || !token) {
        throw new Error("Unable to sign in");
      }

      await storeToken(token);

      // @ts-ignore
      authContext.setUser(account);
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

  return {
    user: authContext.user,
    setUser: authContext.setUser,
    logIn,
    logOut,
    restoreUser,
  };
}
