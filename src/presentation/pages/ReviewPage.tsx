import { getSubmission, getReviews } from "@/apis/submission";
import { getReviewsDto } from "@/apis/dto/submissionDto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/problem/CodeEditor";
import { UserReview } from "../components/review/UserReview";
import { LanguageType } from "@/types/problem";

export default function ReviewPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [reviewsData, setReviewsData] = useState<getReviewsDto | null>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<LanguageType>("c");

  useEffect(() => {
    if (!submissionId) return;

    const fetchReviewData = async () => {
      try {
        const id = parseInt(submissionId, 10);
        // submission 상세 정보(코드, 언어)와 리뷰 목록을 병렬로 불러옵니다.
        const [submissionDetail, reviews] = await Promise.all([
          getSubmission(id),
          getReviews(id),
        ]);

        setCode(submissionDetail.sourceCode);
        setLanguage(submissionDetail.language.toLowerCase() as LanguageType);
        setReviewsData(reviews);
      } catch (error) {
        console.error("리뷰 데이터를 불러오는 데 실패했습니다:", error);
        alert("리뷰 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchReviewData();
  }, [submissionId]);

  return (
    <div className="flex h-full w-full">
      <div className="basis-3/5 min-w-0 overflow-y-auto">
        <CodeEditor
          language={language}
          initialCode={code}
          onChange={() => {}}
          readOnly={true} // CodeEditor를 읽기 전용으로 설정합니다.
        />
      </div>
      <div className="basis-2/5 min-w-0 overflow-y-auto p-4">
        <UserReview reviews={reviewsData?.reviews || []} />
      </div>
    </div>
  );
}
      <CodeEditor
        language={language}
        initialCode={code}
        onChange={() => {}}
        //타이핑 안되게 해야함 ㅜㅜ
      />
      <div className="flex-1 min-w-0 overflow-y-auto">
        <UserReview reviews={[]} />
      </div>
    </div>
  );
}
