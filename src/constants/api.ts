export const API_PREFIX = `${import.meta.env.VITE_API_SERVER}/api/v1`;
// export const API_PREFIX = "/api";
export const API_TEST_TOKEN = `${import.meta.env.VITE_API_TEST_TOKEN_TYPE} ${
  import.meta.env.VITE_API_TEST_TOKEN_VALUE
}`;
export const API_TEST_EMAIL = `${import.meta.env.VITE_API_TEST_EMAIL}`;
export const API_TEST_PASSWORD = `${import.meta.env.VITE_API_TEST_PASSWORD}`;

export const BASE_HEADER = {
  "Content-Type": "application/json",
};

export const getTokenHeader = () => {
  const token = sessionStorage.getItem("jwt");
  return {
    Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${token}`,
    ...BASE_HEADER,
  };
};
