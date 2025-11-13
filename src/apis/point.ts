import { API_PREFIX, TOKEN_HEADER } from "@/constants/api";
import { ApiResponse } from "@/types/api";

const PREFIX = `${API_PREFIX}/points`;

const addAttendance = async (): Promise<string> => {
  const rawResponse = await fetch(`${PREFIX}/attendance/check`, {
    method: "POST",
    headers: TOKEN_HEADER,
  });

  const response: ApiResponse<null> = await rawResponse.json();
  if (response.code != "SUCCESS" || response.data === null) {
    throw new Error(response.message);
  }

  // 출석에 성공했습니다
  // 이미 출석 했습니다
  return response.message;
};

export { addAttendance };
