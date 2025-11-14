import axios from "axios";
import { API_PREFIX, TOKEN_HEADER } from "../constants/api";
import { ApiResponse } from "../types/api";
import { ApiDefaultHeaders } from "../utils/apiHeaders";
import {
  RoadmapPostRequest,
  RoadmapProblem,
  RoadmapResponse,
  MyRoadMapResDto,
  RoadmapProblemsDto,
} from "../types/roadmap";

const PROBLEM_PREFIX = `${API_PREFIX}/roadmaps`;

export const getMyRoadmaps = async (): Promise<MyRoadMapResDto> => {
  try {
    const rawResponse = await fetch(`${PROBLEM_PREFIX}/my`, {
      headers: TOKEN_HEADER,
      method: "GET",
    });

    const response: ApiResponse<MyRoadMapResDto> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRoadmap = async (roadmapId: number) => {
  try {
    const rawResponse = await fetch(`${PROBLEM_PREFIX}/${roadmapId}`, {
      headers: TOKEN_HEADER,
      method: "GET",
    });

    const response: ApiResponse<RoadmapResponse> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRoadmapProblems = async (roadmapId: number) => {
  try {
    const rawResponse = await fetch(`${PROBLEM_PREFIX}/${roadmapId}/problems`, {
      headers: TOKEN_HEADER,
      method: "GET",
    });

    const response: ApiResponse<RoadmapProblemsDto> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postRoadmap = async (
  request: RoadmapPostRequest
): Promise<{ id: number }> => {
  try {
    const rawResponse = await fetch(`${PROBLEM_PREFIX}`, {
      method: "POST",
      headers: TOKEN_HEADER,
      body: JSON.stringify(request),
    });

    const response: ApiResponse<{ id: number }> = await rawResponse.json();

    if (response.code != "SUCCESS" || response.data === null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteRoadmap = async (roadmapId: number) => {
  try {
    const rawResponse = await axios.delete(`${PROBLEM_PREFIX}/${roadmapId}`, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<null> = rawResponse.data;

    console.log(response);
    if (response.code != "SUCCESS") throw new Error(response.message);

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
