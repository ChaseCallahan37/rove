import {
  asyncSecureRemoval,
  asyncSecureRetrieval,
  asyncSecureStore,
} from "./storage";

const key = "rove-token";

export async function storeToken(token: string) {
  return await asyncSecureStore(key, token);
}

export async function retrieveToken() {
  const token = await asyncSecureRetrieval<string>(key);

  if (!token) throw Error("Failed to retrieve token");

  return token;
}

export async function removeToken() {
  return await asyncSecureRemoval(key);
}
