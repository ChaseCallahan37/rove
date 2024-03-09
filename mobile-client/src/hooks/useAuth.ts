import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import useApi from "./useApi";
import { Account, signIn } from "../api/account/account";
import accountApi from "../api/account";
import { removeToken, retrieveToken, storeToken } from "../auth/token";
import { Alert } from "react-native";
import userApi from "../api/user";
import deepCopy from "../utils/deepCopy";

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
    }
  }

  async function signOut() {
    try {
      authContext?.setAccount(null);
      removeToken();

      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async function signIn(credentials: { email: string; password: string }) {
    console.log(`Heres sign in ${credentials.email} ${credentials.password}`);

    try {
      const { account, token } = await accountApi.signIn(credentials);

      if (!account || !token) {
        throw new Error("Unable to sign in");
      }

      await storeToken(token);

      authContext?.setAccount(account);

      return true;
    } catch (e) {
      console.log(e);
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
    }
  }

  async function updateUser(updatedFields: any){
    const token = await retrieveToken()

    if(!token) return

    try{
      const updatedUser = await userApi.updateUserProfile(token, updatedFields)

      const copiedAccount = deepCopy<Account>(authContext?.account ? authContext?.account : {}) 

      copiedAccount.user = updatedUser

      authContext?.setAccount(copiedAccount)

      return true
    } catch(e: any){
      console.log(e);
    }
  }

  return {
    account: authContext?.account,
    setAccount: authContext?.setAccount,
    signIn,
    signOut,
    createAccount,
    restoreAccountInfo,
    updateUser,
  };
}
