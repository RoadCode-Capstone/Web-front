import { API_PREFIX, getTokenHeader } from "@/constants/api";
import { ApiResponse } from "@/types/api";
import { getSubmissionsDto } from "./dto/submissionDto";

const PREFIX = `${API_PREFIX}/submissions`;

const getSubmissions = async (
  startDate: string,
  endDate: string
): Promise<getSubmissionsDto> => {
  try {
    const params = `start=${startDate}&end=${endDate}`;
    const rawResponse = await fetch(`${PREFIX}?${params}`, {
      method: "GET",
      headers: getTokenHeader(),
    });

    const response: ApiResponse<getSubmissionsDto> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getSubmissions };
