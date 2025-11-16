import { getSubmission, getReviews, postReview } from "@/apis/submission";
import { getReviewsDto, getSubmissionDto } from "@/apis/dto/submissionDto";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../components/problem/CodeEditor";
import { UserReview } from "../components/review/UserReview";
import { LanguageType } from "@/types/problem";
import CodeFooter from "../components/review/CodeFooter";
import { Button } from "../components";
import MyCodeHeader from "../components/review/MyCodeHeader";
import { problemRes } from "@/apis/dto/problemDto";
import { getProblem } from "@/apis/problem";
import { AiReview } from "../components/review/AIReview";
import { useReviewStore } from "@/stores/reviewStore";
import { Spinner } from "../components/common/spinner";

export default function ReviewPage() {
  const location = useLocation();
  const state: getSubmissionDto = location.state;

  const {
    submissionData,
    reviewsData,
    problemDetail,
    isLoading,
    fetchReviewPageData,
    clearReviewPageData,
  } = useReviewStore();

  useEffect(() => {
    if (state?.id) {
      fetchReviewPageData(Number(state.id));
    }
    return () => clearReviewPageData();
  }, [state, fetchReviewPageData, clearReviewPageData, state.id]);

  if (isLoading || !submissionData || !problemDetail) {
    return <Spinner />;
  }

  return (
    <div className="flex h-full w-full px-[72px] py-4 gap-x-4">
      <div className="basis-3/5 min-w-0 w-full overflow-y-auto bg-[#282C34] flex flex-col justify-between">
        <div className="w-full">
          <MyCodeHeader {...problemDetail!} />
          <CodeEditor
            language={submissionData.language}
            initialCode={submissionData.sourceCode}
            onChange={() => {}}
            readOnly={true}
          />
        </div>
        <CodeFooter language={submissionData.language} />
      </div>
      <div className="basis-2/5 min-w-0 overflow-y-auto">
        <AiReview
          content={
            reviewsData?.reviews.find((v) => v.nickname === "AI")?.content || ""
          }
        />
        <UserReview />
      </div>
    </div>
  );
}
