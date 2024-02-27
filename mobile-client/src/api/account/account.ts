import createAuthHeader from "../../utils/createAuthHeader";
import service, { RequestResponse, unpackResponse } from "../service";

export type Account = {
  id: string;
  email: string;
  user: {
    id: string;
    user_name: string;
  };
};

const resourceName = "accounts";

export async function signIn(email: string, hashPassword: string) {
  const res = await service.post(resourceName + "/sign-in", {
    email,
    hash_password: hashPassword,
  });

  const {
    data: { account, token },
  } = await unpackResponse<{ data: { account: Account; token: string } }>(res);

  return { token, account };
}

export async function getAccountInfo(token: string) {
  console.log(createAuthHeader(token));

  const res = await service.get(
    resourceName + "/current",
    createAuthHeader(token)
  );

  const {
    data: { account },
  } = await unpackResponse<{ data: { account: Account } }>(res);

  return account;
}

export async function createAccount({email, password, userName}: {email: string, password: string, userName: string}){
  const res = await service.post(resourceName + "/create", {
    account: {
      email,
      hash_password: password,
      user_name: userName
    }
  })

  const {data: {account: createdAccount, token}} = await unpackResponse<{data: {token: string, account: Account}}>(res)

  return {createdAccount, token}
}
