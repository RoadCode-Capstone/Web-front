import { getSubmission, getReviews } from "@/apis/submission";
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

export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state: getSubmissionDto = location.state;

  const [reviewsData, setReviewsData] = useState<getReviewsDto | null>(null);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<LanguageType>("c");
  const [problemDetail, setProblemDetail] = useState<problemRes>();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        if (!state || !state.id) throw new Error("state error");
        const id = state.id;
        const problemResponse = await getProblem(state.problemId);
        if (!problemResponse) throw new Error("problem detail error");
        setProblemDetail(problemResponse);
        await Promise.all([
          (async () => setCode(state.sourceCode))(),
          (async () =>
            setLanguage(state.language.toLowerCase() as LanguageType))(),
          (async () => setReviewsData(await getReviews(id)))(),
        ]);
      } catch (error) {
        console.error("리뷰 데이터를 불러오는 데 실패했습니다:", error);
        alert("리뷰 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchReviewData();
  }, [location.state, navigate]);

  return (
    <div className="flex h-full w-full px-[72px] py-4 gap-x-4">
      <div className="basis-3/5 min-w-0 w-full overflow-y-auto bg-[#282C34] flex flex-col justify-between">
        <div className="w-full">
          <MyCodeHeader {...problemDetail!} />
          <CodeEditor
            language={language}
            initialCode={code}
            onChange={() => {}}
            readOnly={true}
          />
        </div>
        <CodeFooter language={language} />
      </div>
      <div className="basis-2/5 min-w-0 overflow-y-auto  flex flex-col gap-y-4">
        <AiReview content="Hello~~~~~~~~~~~~~~~~~~~~~~~~~~~~" />
        <UserReview reviews={reviewsData?.reviews || []} />
      </div>
    </div>
  );
}
