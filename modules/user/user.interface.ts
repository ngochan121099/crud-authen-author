export interface UserList {
  username?: string;
  password: string;
  role: string;
}

export interface SignUp extends UserList, Document {}
export interface SignIn extends UserList, Document {}

export interface UpdateProfile {
  username?: string;
}

export interface UserId {
  id: string;
}
