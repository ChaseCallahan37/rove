import {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from "react-native-keychain";

export async function asyncSecureStore(key: string, payload: any) {
  try {
    await setGenericPassword(key, JSON.stringify(payload), {
      service: key,
    });
    return true;
  } catch (error) {
    console.log(`Error storing ${payload} at ${key}\n${error}`);
    return false;
  }
}

export async function asyncSecureRetrieval<T>(key: string) {
  try {
    const credentials = await getGenericPassword({
      service: key,
    });

    if (!credentials)
      throw new Error(`Unable to retrieve payload at key ${key}`);

    return JSON.parse(credentials.password) as T;
  } catch (error) {
    console.log(error);
  }
}

export async function asyncSecureRemoval(key: string) {
  try {
    const succesful = await resetGenericPassword({ service: key });

    if (!succesful) throw new Error(`Unable to remove payload for ${key}`);
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}
