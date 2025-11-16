import { create } from "zustand";
import { getReviewsDto, getSubmissionDto } from "@/apis/dto/submissionDto";
import { problemRes } from "@/apis/dto/problemDto";
import { getProblem } from "@/apis/problem";
import { getReviews, getSubmission, postReview } from "@/apis/submission";
import { postComment } from "@/apis/review";
interface ReviewState {
  submissionData: getSubmissionDto | null;
  reviewsData: getReviewsDto | null;
  problemDetail: problemRes | null;
  isLoading: boolean;
  error: string | null;

  fetchReviewPageData: (submissionId: number) => Promise<void>;
  clearReviewPageData: () => void;
  submitReview: (submissionId: number, content: string) => Promise<void>;
  submitComment: (reviewId: number, content: string) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  submissionData: null,
  reviewsData: null,
  problemDetail: null,
  isLoading: true,
  error: null,

  fetchReviewPageData: async (submissionId: number) => {
    set({ isLoading: true, error: null });
    try {
      const [submissionDetail, reviews] = await Promise.all([
        getSubmission(submissionId),
        getReviews(submissionId),
      ]);

      const problemDetail = await getProblem(submissionDetail.problemId);

      set({
        submissionData: submissionDetail,
        reviewsData: reviews,
        problemDetail: problemDetail,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "리뷰 정보를 불러오는 데 실패했습니다.";
      set({ isLoading: false, error: errorMessage });
      console.error("리뷰 데이터를 불러오는 데 실패했습니다:", error);
      alert(errorMessage);
    }
  },

  clearReviewPageData: () => {
    set({
      submissionData: null,
      reviewsData: null,
      problemDetail: null,
      isLoading: true,
      error: null,
    });
  },

  submitReview: async (submissionId: number, content: string) => {
    const response = await postReview(submissionId, content);
    alert(response);
    const currentSubmissionId = get().submissionData?.id;
    if (currentSubmissionId) {
      get().fetchReviewPageData(currentSubmissionId);
    }
  },

  submitComment: async (reviewId: number, content: string) => {
    await postComment(reviewId, content);
    const currentSubmissionId = get().submissionData?.id;
    if (currentSubmissionId) {
      get().fetchReviewPageData(currentSubmissionId);
    }
  },
}));
