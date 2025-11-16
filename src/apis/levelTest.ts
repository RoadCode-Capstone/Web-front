import { API_PREFIX, getTokenHeader } from "../constants/api";
import { ApiResponse } from "../types/api";
import {
  postLeveltestReq,
  postLeveltestRes,
  postSubmissionReq,
  postSubmissionRes,
} from "./dto/leveltestDto";

const LEVELTEST_PREFIX = `${API_PREFIX}/level-test`;

const postSubmission = async (
  request: postSubmissionReq
): Promise<postSubmissionRes> => {
  try {
    const rawResponse = await fetch(`${LEVELTEST_PREFIX}/submissions`, {
      method: "POST",
      headers: getTokenHeader(),
      body: JSON.stringify(request),
    });

    const response: ApiResponse<postSubmissionRes> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postLeveltest = async (
  request: postLeveltestReq
): Promise<postLeveltestRes> => {
  try {
    const rawResponse = await fetch(`${LEVELTEST_PREFIX}`, {
      method: "POST",
      headers: getTokenHeader(),
      body: JSON.stringify(request),
    });

    const response: ApiResponse<postLeveltestRes> = await rawResponse.json();

    if (response.code != "SUCCESS") throw new Error(response.message);
    if (response.data == null) throw new Error("data is null");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { postSubmission, postLeveltest };
