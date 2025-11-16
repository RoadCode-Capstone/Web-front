import axios from "axios";
import { API_PREFIX, getTokenHeader } from "../constants/api";
import { ApiResponse } from "../types/api";
import { ApiDefaultHeaders } from "../utils/apiHeaders";
import {
  RoadmapPostRequest,
  RoadmapProblem,
  RoadmapResponse,
  MyRoadMapResDto,
  RoadmapProblemsDto,
  RoadMapDetailDto,
} from "../types/roadmap";

const PROBLEM_PREFIX = `${API_PREFIX}/roadmaps`;

export const getMyRoadmaps = async (
  status?: string[]
): Promise<MyRoadMapResDto> => {
  try {
    const api = status
      ? `${PROBLEM_PREFIX}/my?statusList=${status.toString()}}`
      : `${PROBLEM_PREFIX}/my`;
    const rawResponse = await fetch(`${api}`, {
      headers: getTokenHeader(),
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

export const getInProgRoadmaps = async (): Promise<RoadMapDetailDto> => {
  try {
    const params = `statusList=IN_PROGRESS`;
    const rawResponse = await fetch(`${PROBLEM_PREFIX}/my?${params}`, {
      headers: getTokenHeader(),
      method: "GET",
    });

    const response: ApiResponse<MyRoadMapResDto> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");

    return response.data.roadmaps[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRoadmap = async (roadmapId: number) => {
  try {
    const rawResponse = await fetch(`${PROBLEM_PREFIX}/${roadmapId}`, {
      headers: getTokenHeader(),
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
      headers: getTokenHeader(),
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
      headers: getTokenHeader(),
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

export const giveUpRoadmap = async (roadmapId: number) => {
  try {
    const rawResponse = await fetch(`${PROBLEM_PREFIX}/${roadmapId}/give-up`, {
      headers: getTokenHeader(),
      method: "POST",
    });

    const response: ApiResponse<null> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);

    return response.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postConceptProblem = async (
  roamdmapId: number,
  currentProblemId: number
): Promise<RoadmapResponse> => {
  try {
    const rawResponse = await fetch(
      `${PROBLEM_PREFIX}/${roamdmapId}/concept-problem`,
      {
        method: "POST",
        headers: getTokenHeader(),
        body: JSON.stringify({
          currentProblemId,
        }),
      }
    );

    const response: ApiResponse<RoadmapResponse> = await rawResponse.json();

    if (response.code != "SUCCESS" || response.data === null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postRecommendProblem = async (
  roamdmapId: number
): Promise<RoadmapResponse> => {
  try {
    const rawResponse = await fetch(
      `${PROBLEM_PREFIX}/${roamdmapId}/recommend-problems`,
      {
        method: "POST",
        headers: getTokenHeader(),
      }
    );

    const response: ApiResponse<RoadmapResponse> = await rawResponse.json();

    if (response.code != "SUCCESS" || response.data === null)
      throw new Error(response.message);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
