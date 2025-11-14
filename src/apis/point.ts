import { API_PREFIX, TOKEN_HEADER } from "@/constants/api";
import { ApiResponse } from "@/types/api";
import {
  getMyPointByTypeDto,
  getMyPointDto,
  getRankingDto,
} from "./dto/pointDto";

const PREFIX = `${API_PREFIX}/points`;

const addAttendance = async (): Promise<string> => {
  try {
    const rawResponse = await fetch(`${PREFIX}/attendance/check`, {
      method: "POST",
      headers: TOKEN_HEADER,
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    // 출석에 성공했습니다
    // 이미 출석 했습니다
    return response.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getMyPoint = async (
  groupBy: "date" | "type",
  start: string,
  end: string
): Promise<getMyPointDto> => {
  try {
    const param = `groupBy=${groupBy}&start=${start}&end=${end}`;
    const rawResponse = await fetch(`${PREFIX}/my?${param}`, {
      method: "GET",
      headers: TOKEN_HEADER,
    });

    const response: ApiResponse<getMyPointDto> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getMyPointByType = async (
  start: string,
  end: string
): Promise<getMyPointByTypeDto> => {
  try {
    const param = `groupBy=type&start=${start}&end=${end}`;
    const rawResponse = await fetch(`${PREFIX}/my?${param}`, {
      method: "GET",
      headers: TOKEN_HEADER,
    });

    const response: ApiResponse<getMyPointByTypeDto> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRanking = async (
  start: string,
  end: string
): Promise<getRankingDto> => {
  try {
    const param = `start=${start}&end=${end}`;
    const rawResponse = await fetch(`${PREFIX}/ranking?${param}`, {
      method: "GET",
      headers: TOKEN_HEADER,
    });

    const response: ApiResponse<getRankingDto> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { addAttendance, getMyPoint, getMyPointByType, getRanking };
