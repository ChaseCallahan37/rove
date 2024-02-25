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
    if (!authContext) return;

    const token = await retrieveToken();

    if (!token) return;

    try {
      const userInfo = await accountApi.getAccountInfo(token);
      if (!userInfo) return;
      authContext.setUser(userInfo);
    } catch (e) {
      console.log(e);
      removeToken();
    }
  }

  async function signOut() {
    // @ts-ignore
    authContext.setUser(null);
    removeToken();
  }

  async function signIn(email: string, password: string) {
    try {
      const { account, token } = await accountApi.signIn(email, password);

      if (!account || !token) {
        throw new Error("Unable to sign in");
      }

      await storeToken(token);

      // @ts-ignore
      authContext.setUser(account);
    } catch (e) {
      // @ts-ignore
      console.log(e);

      // @ts-ignore
      Alert.alert(e.message);
    }
  }

  return {
    user: authContext.user,
    setUser: authContext.setUser,
    signIn,
    signOut,
    restoreUser,
  };
}
