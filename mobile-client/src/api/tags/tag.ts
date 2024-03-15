

export type Tag = {
    id: string,
    name: string
}

export function parseTag(obj: any): Tag{

    return {...obj}
}