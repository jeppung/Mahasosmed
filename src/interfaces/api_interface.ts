export interface IAPIResponse<T = Object | []> {
  data?: T;
  message?: string;
}

export interface IAPILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAPIUserDetailResponse {
  id: string;
  username: string;
  email: string;
  major: string;
}
