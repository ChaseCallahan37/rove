export default function createAuthHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}
