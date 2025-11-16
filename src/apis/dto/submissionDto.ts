import { LanguageType } from "@/types/problem";

interface submissionDetail {
  problemId: number;
  problemName: string;
  submissionId: number;
  isSuccess: boolean;
}

export interface getSubmissionDto {
  id: number;
  problemId: number;
  memberId: number;
  sourceCode: string;
  language: LanguageType;
  success: boolean;
}

export interface submissionDto {
  date: string;
  submissionDetails: submissionDetail[];
}

export interface getSubmissionsDto {
  history: submissionDto[];
}

export interface commentDetail {
  commentId: number;
  memberId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface reviewDto {
  reviewId: number;
  memberId: number;
  nickname: string;
  content: string;
  comments: commentDetail[];
  createdAt: string;
}

export interface getReviewsDto {
  reviews: reviewDto[];
}
