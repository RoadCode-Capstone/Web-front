import axios from "axios";
import { API_PREFIX, TOKEN_HEADER } from "../constants/api";
import { ApiResponse } from "../types/api";
import { ProblemResponse } from "../types/leveltest";
import { ApiDefaultHeaders } from "../utils/apiHeaders";
import { SolutionRequest, SolutionResponse } from "../types/problem";
import { problemsRes, problemRes } from "./dto/problemDto";

const PROBLEM_PREFIX = `${API_PREFIX}/problems`;

export const getProblem = async (request: number): Promise<problemRes> => {
  try {
    const params = `ids=${request}`;
    const rawResponse = await fetch(`${PROBLEM_PREFIX}?${params}`, {
      method: "GET",
      headers: TOKEN_HEADER,
    });

    const response: ApiResponse<problemsRes> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data.problems[0];
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
    const rawResponse = await fetch(
      `${PROBLEM_PREFIX}/${problemId}/submission`,
      {
        body: JSON.stringify(request),
        headers: TOKEN_HEADER,
        method: "POST",
      }
    );
    const response: ApiResponse<SolutionResponse> = await rawResponse.json();

    if (response.code != "SUCCESS" || response.data == null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
