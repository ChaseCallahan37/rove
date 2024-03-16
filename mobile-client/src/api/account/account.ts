import { retrieveToken } from "../../auth/token";
import createAuthHeader from "../../utils/createAuthHeader";
import service, { RequestResponse, unpackResponse } from "../service";
import { User, parseUser } from "../user/user";

export type Account = {
  id: string;
  email: string;
  user?: User;
};

export function parseAccount(obj: any): Account {
  return {
    ...obj,
    user: obj.user ? parseUser(obj.user) : null,
  };
}

const resourceName = "accounts";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await service.post(resourceName + "/sign-in", {
    payload: {
      email,
      hash_password: password,
    },
  });

  const {
    data: { account, token },
  } = await unpackResponse<{ data: { account: Account; token: string } }>(res);

  return { token, account: parseAccount(account) };
}

export async function getAccountInfo() {
  const token = await retrieveToken();

  const res = await service.get(resourceName + "/current", {
    headers: createAuthHeader(token),
  });

  const {
    data: { account },
  } = await unpackResponse<{ data: { account: Account } }>(res);

  return parseAccount(account);
}

export async function createAccount({
  email,
  password,
  userName,
}: {
  email: string;
  password: string;
  userName: string;
}) {
  const res = await service.post(resourceName + "/create", {
    payload: {
      account: {
        email,
        hash_password: password,
        user_name: userName,
      },
    },
  });

  const {
    data: { account: createdAccount, token },
  } = await unpackResponse<{ data: { token: string; account: Account } }>(res);

  return { createdAccount: parseAccount(createdAccount), token };
}
