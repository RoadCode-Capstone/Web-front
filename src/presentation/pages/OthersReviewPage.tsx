import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../components/problem/CodeEditor";
import { UserReview } from "../components/review/UserReview";
import { getOthersSubmissions } from "@/apis/problem";
import { Button } from "../components";
import { Spinner } from "../components/common/spinner";
import { getOthersSubmissionsDto } from "@/apis/dto/problemDto";
import CodeFooter from "../components/review/CodeFooter";
import OtherCodeHeader from "../components/review/OtherCodeHeader";
import { AiReview } from "../components/review/AIReview";
import { useReviewStore } from "@/stores/reviewStore";

export default function OthersReviewPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const [submissionIds, setSubmissionIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nickname, setNickname] = useState<string>("");
  const {
    submissionData,
    reviewsData,
    isLoading,
    fetchReviewPageData,
    clearReviewPageData,
  } = useReviewStore();

  // 1. problemId로 다른 사람들의 submission ID 목록을 가져옵니다.
  useEffect(() => {
    if (!problemId) return;

    const fetchSubmissionIds = async () => {
      try {
        const id = parseInt(problemId, 10);
        const response: getOthersSubmissionsDto = await getOthersSubmissions(
          id
        );
        if (response.submissions.length > 0) {
          setSubmissionIds(response.submissions.map((s) => s.submissionId));
        } else {
          setSubmissionIds([]);
        }
      } catch (error) {
        console.error(
          "다른 사람의 풀이 목록을 불러오는 데 실패했습니다:",
          error
        );
        setSubmissionIds([]);
      }
    };

    fetchSubmissionIds();
  }, [problemId]);

  // 2. 현재 index에 해당하는 submission의 상세 정보와 리뷰를 가져옵니다.
  useEffect(() => {
    const getNickname = async () => {
      const response: getOthersSubmissionsDto = await getOthersSubmissions(
        parseInt(problemId!, 10)
      );
      setNickname(response.submissions[currentIndex].nickname);
    };
    if (submissionIds.length > 0) {
      const submissionId = submissionIds[currentIndex];
      fetchReviewPageData(submissionId);
    }
    getNickname();
    return () => {
      clearReviewPageData();
    };
  }, [currentIndex, submissionIds, fetchReviewPageData, clearReviewPageData]);

  const handleNext = () => {
    if (currentIndex < submissionIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGoToMain = () => {
    navigate("/");
  };

  if (isLoading || !submissionData) {
    return <Spinner />;
  }

  if (submissionIds.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p>다른 사람의 풀이가 아직 없습니다.</p>
      </div>
    );
  }

  const isLast = currentIndex === submissionIds.length - 1;

  return (
    <div className="flex h-full w-full px-[72px] py-4 gap-x-4">
      <div className="basis-3/5 min-w-0 overflow-y-auto bg-[#282C34] flex flex-col justify-between">
        <div>
          <OtherCodeHeader nickname={nickname!} />
          <CodeEditor
            key={submissionIds[currentIndex]}
            language={submissionData.language}
            initialCode={submissionData.sourceCode}
            onChange={() => {}}
            readOnly={true}
          />
        </div>
        <CodeFooter language={submissionData.language} />
      </div>
      <div className="basis-2/5 min-w-0 overflow-y-auto  flex flex-col gap-y-4">
        <div className="flex-grow">
          <AiReview
            content={
              reviewsData?.reviews.find((v) => v.nickname === "AI")?.content ||
              ""
            }
          />
          <UserReview />
        </div>
        <div className="">
          <Button
            text={isLast ? "메인페이지로 이동하기" : "다음 풀이 조회하기"}
            onClick={isLast ? handleGoToMain : handleNext}
            colorTheme={"point-secondary"}
            style="w-full h-[72px]"
          />
        </div>
      </div>
    </div>
  );
}
