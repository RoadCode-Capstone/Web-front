import { API_PREFIX, getTokenHeader } from "@/constants/api";
import { ApiResponse } from "@/types/api";
import {
  getReviewsDto,
  getSubmissionDto,
  getSubmissionsDto,
} from "./dto/submissionDto";
import { problemRes } from "./dto/problemDto";

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

const getSubmission = async (
  submissionId: number
): Promise<getSubmissionDto> => {
  try {
    const rawResponse = await fetch(`${PREFIX}/${submissionId}`, {
      method: "GET",
      headers: getTokenHeader(),
    });

    const response: ApiResponse<getSubmissionDto> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getReviews = async (submissionId: number): Promise<getReviewsDto> => {
  try {
    const rawResponse = await fetch(
      `${PREFIX}/${submissionId}/reviews-with-comments`,
      {
        method: "GET",
        headers: getTokenHeader(),
      }
    );

    const response: ApiResponse<getReviewsDto> = await rawResponse.json();
    if (response.code != "SUCCESS" || response.data === null) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postReview = async (
  submissionId: number,
  comment: string
): Promise<string> => {
  try {
    const rawResponse = await fetch(`${PREFIX}/${submissionId}/reviews`, {
      method: "POST",
      headers: getTokenHeader(),
      body: JSON.stringify({ comment }),
    });

    const response: ApiResponse<null> = await rawResponse.json();
    if (response.code != "SUCCESS") {
      throw new Error(response.message);
    }

    return response.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export { getSubmissions, getSubmission, getReviews, postReview };
