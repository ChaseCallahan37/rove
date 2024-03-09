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
  return await asyncSecureRetrieval<string>(key);
}

export async function removeToken() {
  return await asyncSecureRemoval(key);
}
