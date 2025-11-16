import { API_PREFIX, getTokenHeader } from "@/constants/api";
import { ApiResponse } from "@/types/api";
import {
  getReviewsDto,
  getSubmissionDto,
  getSubmissionsDto,
} from "./dto/submissionDto";
import { problemRes } from "./dto/problemDto";

const PREFIX = `${API_PREFIX}/reviews`;

const postComment = async (
  reviewId: number,
  content: string
): Promise<string> => {
  try {
    const rawResponse = await fetch(`${PREFIX}/${reviewId}/comments`, {
      method: "POST",
      headers: getTokenHeader(),
      body: JSON.stringify({ content }),
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
export { postComment };
