import createAuthHeader from "../../utils/createAuthHeader";
import service from "../service";

export type User = {
  id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: string;
};

const resourceName = "users";

export async function updateUserProfile(
  token: string,
  updatedFields: {
    first_name: string;
    last_name: string;
    dob: Date;
    gender: string;
  }
) {
  await service.post(resourceName, {
    headers: createAuthHeader(token),
    payload: {
      user: updatedFields,
    },
  });

  return true;
}
