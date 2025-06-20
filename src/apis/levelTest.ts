import axios from "axios";
import { API_PREFIX } from "../constants/api";
import { ApiResponse } from "../types/api";
import {
  LeveltestRequest,
  LevelTestSubmissionsRequest,
  LevelTestSubmissionsResponse,
  ProblemResponse,
} from "../types/leveltest";
import { ApiDefaultHeaders } from "../utils/apiHeaders";

const LEVELTEST_PREFIX = `${API_PREFIX}/level-test`;

export const postSubmission = async (
  request: LevelTestSubmissionsRequest
): Promise<LevelTestSubmissionsResponse> => {
  try {
    const axiosResponse = await axios.post(
      `${LEVELTEST_PREFIX}/submissions`,
      request,
      {
        headers: {
          ...ApiDefaultHeaders,
        },
      }
    );
    const response: ApiResponse<LevelTestSubmissionsResponse> =
      axiosResponse.data;

    console.log(response);

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postLeveltest = async (
  request: LeveltestRequest
): Promise<number[]> => {
  try {
    const axiosResponse = await axios.post(`${LEVELTEST_PREFIX}`, request, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<number[]> = axiosResponse.data;

    console.log(response);

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
