import axios from "axios";
import { API_PREFIX, API_TEST_TOKEN } from "../constants/api";
import { ApiResponse } from "../types/api";
import { Auth, AuthLoginRequest, AuthLoginResponse } from "../types/auth";

const AUTH_PREFIX = `${API_PREFIX}/auth`;

export const signup = async (request: Auth) => {
  try {
    const axiosResponse = await axios.post(`${AUTH_PREFIX}/signup`, request);
    const response: ApiResponse<null> = axiosResponse.data;
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (request: AuthLoginRequest) => {
  try {
    const axiosResponse = await axios.post(`${AUTH_PREFIX}/login`, request);
    const response: ApiResponse<AuthLoginResponse> = axiosResponse.data;
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const axiosResponse = await axios.post(`${AUTH_PREFIX}/logout`, {
      headers: {
        Authorization: API_TEST_TOKEN,
      },
    });

    const response: ApiResponse<string> = axiosResponse.data;

    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    console.log(error);
  }
};
