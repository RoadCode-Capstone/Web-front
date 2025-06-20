import axios from "axios";
import { API_PREFIX } from "../constants/api";
import { ApiResponse } from "../types/api";
import { ProblemResponse } from "../types/leveltest";
import { ApiDefaultHeaders } from "../utils/apiHeaders";

const PROBLEM_PREFIX = `${API_PREFIX}/problems`;
export const getProblems = async (
  request: number[]
): Promise<ProblemResponse[]> => {
  try {
    const params = { ids: request.toString() };
    const axiosResponse = await axios.get(`${PROBLEM_PREFIX}`, {
      params,
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<ProblemResponse[]> = axiosResponse.data;

    console.log(response);
    if (response.code != "SUCCESS" || response.data == null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
