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

  if (!authContext?.account) {
    restoreUser();
  }

  async function restoreUser() {
    if (!authContext) return;

    const token = await retrieveToken();

    if (!token) return;

    try {
      const accountInfo = await accountApi.getAccountInfo(token);
      authContext?.setAccount(accountInfo);
    } catch (e) {
      console.log(e);
      removeToken();
    }
  }

  async function signOut() {
    authContext?.setAccount(null);
    removeToken();
  }

  async function signIn(email: string, password: string) {
    try {
      const { account, token } = await accountApi.signIn(email, password);

      if (!account || !token) {
        throw new Error("Unable to sign in");
      }

      await storeToken(token);

      authContext?.setAccount(account);
    } catch (e) {
      console.log(e);

      // @ts-ignore
      Alert.alert(e.message);
    }
  }

  async function createAccount(accountInfo: {email: string, password: string, userName: string}) {
    try{
      const {createdAccount, token} = await accountApi.createAccount(accountInfo)
      
      if(!createdAccount || !token) throw new Error("Account was not succesfully created")

      await storeToken(token)

      authContext?.setAccount(createdAccount)

      return true

    } catch(e){
      console.log(e);
      return false
    }
    
  }

  return {
    account: authContext.account,
    setAccount: authContext.setAccount,
    signIn,
    signOut,
    createAccount,
    restoreUser,
  };
}
