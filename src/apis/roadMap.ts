import axios from "axios";
import { API_PREFIX } from "../constants/api";
import { ApiResponse } from "../types/api";
import { ApiDefaultHeaders } from "../utils/apiHeaders";
import {
  RoadmapPostRequest,
  RoadmapProblem,
  RoadmapResponse,
  RoadmapsResponse,
} from "../types/roadmap";

const PROBLEM_PREFIX = `${API_PREFIX}/roadmaps`;

export const getRoadmaps = async (): Promise<RoadmapsResponse[]> => {
  try {
    const axiosResponse = await axios.get(`${PROBLEM_PREFIX}/my`, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<RoadmapsResponse[]> = axiosResponse.data;

    console.log(response);
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
    const axiosResponse = await axios.get(`${PROBLEM_PREFIX}/${roadmapId}`, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<RoadmapResponse> = axiosResponse.data;

    console.log(response);
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
    const axiosResponse = await axios.get(
      `${PROBLEM_PREFIX}/${roadmapId}/problems`,
      {
        headers: {
          ...ApiDefaultHeaders,
        },
      }
    );

    const response: ApiResponse<RoadmapProblem[]> = axiosResponse.data;

    console.log(response);
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
): Promise<boolean> => {
  try {
    const axiosResponse = await axios.post(`${PROBLEM_PREFIX}`, request, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<null> = axiosResponse.data;

    console.log(response);
    if (response.code != "SUCCESS") throw new Error(response.message);

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const deleteRoadmap = async (
  roadmapId: number
) => {
  try {
    const axiosResponse = await axios.delete(`${PROBLEM_PREFIX}/${roadmapId}`, {
      headers: {
        ...ApiDefaultHeaders,
      },
    });

    const response: ApiResponse<null> = axiosResponse.data;

    console.log(response);
    if (response.code != "SUCCESS") throw new Error(response.message);

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
}