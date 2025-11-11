import axios from "axios";
import { API_HEADER, API_PREFIX, API_TEST_TOKEN } from "../constants/api";
import { ApiResponse } from "../types/api";
import { Auth, AuthLoginRequest, AuthLoginResponse } from "../types/auth";

const AUTH_PREFIX = `${API_PREFIX}/auth`;

export const signup = async (request: Auth) => {
  try {
    const rawResponse = await fetch(`${AUTH_PREFIX}/signup`, {
      method: "Post",
      body: JSON.stringify(request),
      headers: API_HEADER,
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (
  request: AuthLoginRequest
): Promise<AuthLoginResponse> => {
  try {
    const response = await fetch(`${AUTH_PREFIX}/login`, {
      method: "Post",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result: ApiResponse<AuthLoginResponse> = await response.json();

    if (result.code != "SUCCESS" || result.data == null) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const rawResponse = await axios.post(`${AUTH_PREFIX}/logout`, {
      headers: {
        Authorization: API_TEST_TOKEN,
      },
    });

    const response: ApiResponse<string> = rawResponse.data;

    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    console.log(error);
  }
};
