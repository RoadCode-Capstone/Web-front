import { LanguageType } from "@/types/problem";
import {
  ProblemBody,
  ProblemFooter,
  ProblemHeader,
} from "@/presentation/components";
import CodeEditor from "@/presentation/components/problem/CodeEditor";
import { problemRes } from "@/apis/dto/problemDto";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Suggest } from "@/presentation/components/problem/modals/Suggest";
import { Scoring } from "@/presentation/components/problem/modals/Scoring";
import { postSubmission } from "@/apis/leveltest";
import { ResultModal } from "@/presentation/components/leveltest/ResultModal";

interface ProblemPageProps {
  language: LanguageType;
  problems: problemRes[];
}

export function LeveltestEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !Array.isArray(location.state.problems)) {
      alert("잘못된 접근입니다. 레벨 테스트 설정 페이지로 이동합니다.");
      navigate("/leveltest/setting");
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null; // useEffect가 실행될 때까지 렌더링을 중단합니다.
  }
  const { language, problems } = location.state as ProblemPageProps;
  const [currentProblemIdx, setCurrentProblemIdx] = useState<number>(0);
  const [submissions, setSubmissions] = useState<
    {
      problemId: number;
      language: LanguageType;
      sourceCode: string;
    }[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const handleCodeChange = (
    problemId: number,
    language: LanguageType,
    sourceCode: string
  ) => {
    setSubmissions((prevSubmissions) => {
      const existingSubmissionIndex = prevSubmissions.findIndex(
        (sub) => sub.problemId === problemId
      );

      if (existingSubmissionIndex > -1) {
        const updatedSubmissions = [...prevSubmissions];
        updatedSubmissions[existingSubmissionIndex].sourceCode = sourceCode;
        return updatedSubmissions;
      } else {
        return [...prevSubmissions, { problemId, language, sourceCode }];
      }
    });
  };

  const handleSubmissions = async () => {
    setIsLoading(true);
    const response = await postSubmission({ submissions: submissions });
    setIsLoading(false);
    setResult(() => response.passedCount);
  };

  return (
    <>
      {isLoading && <Scoring />}
      {result === null ? null : <ResultModal result={result} />}
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        {/* 상단 고정 헤더 */}
        <ProblemHeader title={problems[currentProblemIdx].name} />

        {
          <ProblemMain
            key={currentProblemIdx}
            description={problems[currentProblemIdx].description}
            inputDescription={problems[currentProblemIdx].inputDescription}
            outputDescription={problems[currentProblemIdx].outputDescription}
            language={language}
            problemId={problems[currentProblemIdx].problemId}
            onCodeChange={handleCodeChange}
          />
        }

        {/* 하단 고정 푸터 */}
        <ProblemFooter
          language={language.toUpperCase()}
          onClick={async () => {
            if (currentProblemIdx >= problems.length - 1) {
              console.log(JSON.stringify(submissions));
              await handleSubmissions();
            } else {
              setCurrentProblemIdx((prev) => prev + 1);
            }
          }}
        />
      </div>
    </>
  );
}

interface ProblemMainProps {
  language: LanguageType;
  description: string;
  inputDescription: string;
  outputDescription: string;
  problemId: number;
  onCodeChange: (
    problemId: number,
    language: LanguageType,
    sourceCode: string
  ) => void;
}

function ProblemMain(props: ProblemMainProps) {
  const [sourceCode, setSourceCode] = useState("");
  return (
    <div className="flex flex-1 min-h-0 bg-[#282C34]">
      {/* 왼쪽: 문제 영역 */}
      <div className="basis-2/5 min-w-0 overflow-y-auto">
        <ProblemBody
          problem_description={props.description}
          input_description={props.inputDescription}
          output_description={props.outputDescription}
        />
      </div>

      {/* 오른쪽: 코드 에디터 */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <CodeEditor
          language={props.language}
          onChange={(newCode) => {
            setSourceCode(newCode);
            props.onCodeChange(props.problemId, props.language, newCode);
          }}
        />
      </div>
    </div>
  );
}
