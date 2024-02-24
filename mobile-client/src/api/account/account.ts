import createAuthHeader from "../../utils/createAuthHeader";
import service from "../service";

export type Account = {
  id: string;
  email: string;
};

const resourceName = "accounts";

export async function signIn(email: string, hashPassword: string) {
  const res = await service.post(resourceName + "/sign-in", {
    email,
    hash_password: hashPassword,
  });

  const {
    data: { token, account },
  } = await res.json();

  return { token, account };
}

export async function getAccountInfo(token: string) {
  const res = await service.get(
    resourceName + "/current",
    createAuthHeader(token)
  );

  const { data: account } = await res.json();

  return account;
}
