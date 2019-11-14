export interface User {
  name: string;
  email: string;
  uid: string;
}
export interface UserId extends User {
  id: string;
}
