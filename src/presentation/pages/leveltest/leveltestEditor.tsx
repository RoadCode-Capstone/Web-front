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

interface ProblemPageProps {
  language: LanguageType;
  problems: problemRes[];
}

export function LeveltestEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  // state가 없으면 렌더링을 중단하고 리디렉션 로직을 실행합니다.
  useEffect(() => {
    if (!location.state || !Array.isArray(location.state.problems)) {
      alert("잘못된 접근입니다. 레벨 테스트 설정 페이지로 이동합니다.");
      navigate("/leveltest/setting");
    }
  }, [location.state, navigate]);

  // state 유효성 검사 후 구조 분해 할당을 진행합니다.
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

  const handleCodeChange = (
    problemId: number,
    language: LanguageType,
    sourceCode: string
  ) => {
    setSubmissions((prevSubmissions) => {
      return [
        ...prevSubmissions,
        { problemId: problemId, language: language, sourceCode: sourceCode },
      ];
    });
    console.log(submissions);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        {/* 상단 고정 헤더 */}
        <ProblemHeader title="문제 제목" />

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
          onClick={() => {
            setCurrentProblemIdx(() => currentProblemIdx + 1);
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
          onChange={(sourceCode) => {
            props.onCodeChange(props.problemId, props.language, sourceCode);
          }}
        />
      </div>
    </div>
  );
}
