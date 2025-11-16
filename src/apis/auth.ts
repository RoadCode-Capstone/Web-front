import axios from "axios";
import { BASE_HEADER, API_PREFIX, API_TEST_TOKEN } from "../constants/api";
import { ApiResponse } from "../types/api";
import { Auth, AuthLoginRequest, AuthLoginResponse } from "../types/auth";

const AUTH_PREFIX = `${API_PREFIX}/auth`;

const signup = async (request: Auth) => {
  try {
    const rawResponse = await fetch(`${AUTH_PREFIX}/signup`, {
      method: "Post",
      body: JSON.stringify(request),
      headers: BASE_HEADER,
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    throw error;
  }
};

const login = async (request: AuthLoginRequest): Promise<AuthLoginResponse> => {
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

const logout = async () => {
  try {
    sessionStorage.removeItem("jwt");
    // const rawResponse = await axios.post(`${AUTH_PREFIX}/logout`, {
    //   headers: {
    //     Authorization: API_TEST_TOKEN,
    //   },
    // });

    // const response: ApiResponse<string> = rawResponse.data;

    // if (response.code != "SUCCESS") {
    //   throw new Error(response.message);
    // }

    // return response.message;
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async (email: string) => {
  try {
    const rawResponse = await fetch(`${AUTH_PREFIX}/signup/verify-email`, {
      method: "Post",
      body: JSON.stringify({
        email,
      }),
      headers: BASE_HEADER,
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const verifyCode = async (email: string, verificationCode: string) => {
  try {
    const rawResponse = await fetch(`${AUTH_PREFIX}/verify-code`, {
      method: "Post",
      body: JSON.stringify({
        email,
        verificationCode,
      }),
      headers: BASE_HEADER,
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    throw error;
  }
};

const getPasswordverifyCode = async (email: string) => {
  try {
    const rawResponse = await fetch(
      `${AUTH_PREFIX}/reset-password/verify-email`,
      {
        method: "Post",
        body: JSON.stringify({
          email,
        }),
        headers: BASE_HEADER,
      }
    );

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (email: string, newPassword: string) => {
  try {
    const rawResponse = await fetch(`${AUTH_PREFIX}/reset-password`, {
      method: "Post",
      body: JSON.stringify({
        email,
        newPassword,
      }),
      headers: BASE_HEADER,
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (error) {
    throw error;
  }
};

export {
  signup,
  login,
  logout,
  verifyEmail,
  verifyCode,
  getPasswordverifyCode,
  resetPassword,
};
