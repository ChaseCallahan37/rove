import service, { unpackResponse } from "../service";

export type Tag = {
  id: string;
  name: string;
};

export function parseTag(obj: any): Tag {
  return { ...obj };
}

const resourceName = "tags";

export async function retrieveTags() {
  const res = await service.get(resourceName);

  const { data: tags } = await unpackResponse<{ data: Tag[] }>(res);

  return tags;
}
