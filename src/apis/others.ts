import { API_PREFIX, getTokenHeader } from "@/constants/api";
import { ApiResponse } from "@/types/api";

const getTags = async (): Promise<{ tags: string[] }> => {
  try {
    const rawResponse = await fetch(`${API_PREFIX}/tags`, {
      method: "GET",
      headers: getTokenHeader(),
    });

    const response: ApiResponse<{ tags: string[] }> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getTags };
