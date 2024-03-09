export type User = {
  id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: "male" | "female" | "other";
};
