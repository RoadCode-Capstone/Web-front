import axios from "axios";
import { API_PREFIX, TOKEN_HEADER } from "../constants/api";
import { ApiResponse } from "../types/api";
import { ProblemResponse } from "../types/leveltest";
import { ApiDefaultHeaders } from "../utils/apiHeaders";
import { SolutionRequest, SolutionResponse } from "../types/problem";
import { problemsRes } from "./dto/problemDto";

const PROBLEM_PREFIX = `${API_PREFIX}/problems`;

export const getProblem = async (
  problemId: number
): Promise<ProblemResponse> => {
  try {
    const rawResponse = await axios.get(`${PROBLEM_PREFIX}/${problemId}`, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<ProblemResponse> = rawResponse.data;

    if (response.code != "SUCCESS" || response.data == null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProblems = async (request: number[]): Promise<problemsRes> => {
  try {
    const params = `ids=${request.toString()}`;
    const rawResponse = await fetch(`${PROBLEM_PREFIX}?${params}`, {
      method: "GET",
      headers: TOKEN_HEADER,
    });

    const response: ApiResponse<problemsRes> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postSolution = async (
  problemId: number,
  request: SolutionRequest
): Promise<SolutionResponse> => {
  try {
    const rawResponse = await axios.post(
      `${PROBLEM_PREFIX}/${problemId}/solution`,
      request,
      {
        headers: {
          ...ApiDefaultHeaders,
        },
      }
    );
    const response: ApiResponse<SolutionResponse> = rawResponse.data;

    console.log(response);
    if (response.code != "SUCCESS" || response.data == null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
