import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import useApi from "./useApi";
import { signIn } from "../api/account/account";
import accountApi from "../api/account";
import { removeToken, retrieveToken, storeToken } from "../auth/token";
import { Alert } from "react-native";

export default function useAuth() {
  const authContext = useContext(AuthContext);

  async function restoreAccountInfo() {
    const token = await retrieveToken();

    if (!token) return;

    try {
      const accountInfo = await accountApi.getAccountInfo(token);
      return accountInfo;
    } catch (e) {
      console.log(e);
      removeToken();
      return false;
    }
  }

  async function signOut() {
    try {
      authContext?.setAccount(null);
      removeToken();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function signIn(credentials: { email: string; password: string }) {
    try {
      const { account, token } = await accountApi.signIn(credentials);

      if (!account || !token) {
        throw new Error("Unable to sign in");
      }
      console.log("HI");

      console.log(account);
      console.log(token);

      await storeToken(token);

      console.log("CONtext");
      console.log(account);
      console.log(authContext);

      authContext?.setAccount(account);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async function createAccount(accountInfo: {
    email: string;
    password: string;
    userName: string;
  }) {
    try {
      const { createdAccount, token } = await accountApi.createAccount(
        accountInfo
      );

      if (!createdAccount || !token)
        throw new Error("Account was not succesfully created");

      await storeToken(token);

      authContext?.setAccount(createdAccount);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return {
    account: authContext?.account,
    setAccount: authContext?.setAccount,
    signIn,
    signOut,
    createAccount,
    restoreAccountInfo,
  };
}
