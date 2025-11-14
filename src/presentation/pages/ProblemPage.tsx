import { LanguageType } from "@/types/problem";
import { ProblemBody, ProblemFooter, ProblemHeader } from "../components";
import CodeEditor from "../components/problem/CodeEditor";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postSolution } from "@/apis/problem";
import { Scoring } from "../components/problem/modals/Scoring";
import { Correct } from "../components/problem/modals/Correct";
import { Fail } from "../components/problem/modals/Fail";
import { Suggest } from "../components/problem/modals/Suggest";

interface ProblemPageProps {
  language: LanguageType;
}

const SUGGEST_COUNT = 3;

export default function ProblemPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    title,
    description,
    inputDescription,
    outputDescription,
    language,
    roadmapId,
    roadmapProblemId,
    problemId,
  } = location.state;
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | "SUGGEST" | "FAIL" | "CORRECT">(
    null
  );
  const [failCount, setFailCount] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await postSolution(problemId, {
        roadmapId,
        roadmapProblemId,
        language,
        sourceCode: code,
      });
      const isPassed = response.allPassed;
      if (isPassed === true) setResult("CORRECT");
      else {
        setFailCount((prev) => prev + 1);
        failCount < SUGGEST_COUNT ? setResult("FAIL") : setResult("SUGGEST");
      }
    } catch (err) {
      console.error("제출 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Scoring />}
      {result === "CORRECT" && <Correct />}
      {result === "FAIL" && <Fail onClose={() => setResult(null)} />}
      {result === "SUGGEST" && <Suggest onClose={() => setResult(null)} />}
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        {/* 상단 고정 헤더 */}
        <ProblemHeader title={title} />

        {/* 본문 영역 (남은 공간 모두 차지) */}
        <div className="flex flex-1 min-h-0 bg-[#282C34]">
          {/* 왼쪽: 문제 영역 */}
          <div className="basis-2/5 min-w-0 overflow-y-auto">
            <ProblemBody
              problem_description={description}
              input_description={inputDescription}
              output_description={outputDescription}
            />
          </div>

          {/* 오른쪽: 코드 에디터 */}
          <div className="flex-1 min-w-0 overflow-y-auto">
            <CodeEditor
              language={language}
              initialCode={code}
              onChange={(newCode) => setCode(newCode)}
            />
          </div>
        </div>

        {/* 하단 고정 푸터 */}
        <ProblemFooter language={language} onClick={handleSubmit} />
      </div>
    </>
  );
}
