import createAuthHeader from "../../utils/createAuthHeader";
import service, { unpackResponse } from "../service";

export type User = {
  id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: string;
};

export function parseUser(obj: any){
  return {...obj, dob: new Date(obj.dob)}
}

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
  
  
  const res = await service.put(`${resourceName}/update`, {
    headers: createAuthHeader(token),
    payload: {
      user: updatedFields,
    },
  });

  const { data: user} = await unpackResponse<{data: User}>(res)

  return parseUser(user) 
}
