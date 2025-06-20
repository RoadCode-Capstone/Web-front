export interface Auth {
  email: string;
  password: string;
  nickname: string;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  accessToken: string;
}
