export const API_PREFIX = `${import.meta.env.VITE_API_SERVER}/api/v1`;
export const API_TEST_TOKEN = `${import.meta.env.VITE_API_TEST_TOKEN_TYPE} ${
  import.meta.env.VITE_API_TEST_TOKEN_VALUE
}`;
export const API_TEST_EMAIL = `${import.meta.env.VITE_API_TEST_EMAIL}`;
export const API_TEST_PASSWORD = `${import.meta.env.VITE_API_TEST_PASSWORD}`;

export const BASE_HEADER = {
  "Content-Type": "application/json",
};

export const TOKEN_HEADER = {
  Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${sessionStorage.getItem(
    "jwt"
  )}`,
  ...BASE_HEADER,
};
