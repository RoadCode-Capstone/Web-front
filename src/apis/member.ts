import { API_PREFIX, BASE_HEADER } from "@/constants/api";
import { ApiResponse } from "@/types/api";

const PREFIX = `${API_PREFIX}/member`;

const isExistEmail = async (email: string): Promise<DuplicatedDto> => {
  const query = `email=${email}`;
  const rawResponse = await fetch(`${PREFIX}/exists-email?${query}`, {
    method: "Get",
    headers: BASE_HEADER,
  });

  const response: ApiResponse<DuplicatedDto> = await rawResponse.json();
  if (response.code != "SUCCESS" || response.data === null) {
    throw new Error(response.message);
  }

  return response.data;
};

const isExistNickname = async (nickname: string): Promise<DuplicatedDto> => {
  const query = `nickname=${nickname}`;
  const rawResponse = await fetch(`${PREFIX}/exists-nickname?${query}`, {
    method: "Get",
    headers: BASE_HEADER,
  });

  const response: ApiResponse<DuplicatedDto> = await rawResponse.json();
  if (response.code != "SUCCESS" || response.data == null) {
    throw new Error(response.message);
  }

  return response.data;
};

export { isExistEmail, isExistNickname };
