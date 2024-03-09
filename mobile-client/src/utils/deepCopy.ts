export default function deepCopy<T>(obj: object){
    return JSON.parse(JSON.stringify(obj)) as T
}