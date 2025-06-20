import { useState } from "react";
import { postLeveltest, postSubmission } from "../../apis/levelTest";
import { ProblemResponse } from "../../types/leveltest";
import { Button } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import Problem from "./Problem";
import { getProblems } from "../../apis/problem";
import { Spinner } from "../components/common/spinner";

interface LevelTestProps {
  language?: "java" | "python" | "cpp";
  algorithm?: string;
  dailyGoal: number;
}

const LevelTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    language = "cpp",
    algorithm,
    dailyGoal,
  } = location.state as LevelTestProps;
  const [codes, setCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProblem = (code: string) => {
    code = code ? code : " ";
    setCodes((prev) => [...prev, code]);
  };

  const [problems, setProblems] = useState<ProblemResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = async () => {
    const submissions = {
      submissions: problems.map((problem, index) => ({
        problemId: problem.id,
        language: language,
        sourceCode: codes[index] || " ", // 빈칸 방지
      })),
    };

    console.log(`submissions: ${JSON.stringify(submissions)}`);

    try {
      setIsLoading(true);
      const res = await postSubmission(submissions);
      console.log("제출 성공:", res);

      const request = algorithm
        ? { type: "algorithm", category: algorithm }
        : { type: "language", category: language == "cpp" ? "c" : language };

      navigate("/leveltest/result", {
        state: {
          type: request.type,
          category: request.category,
          dailyGoal,
          problemIdList: problems.map((v) => v.id),
          passedCount: res.passedCount,
          levelTestResult: res.result,
        },
      });
    } catch (err) {
      console.error("제출 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (code: string) => {
    setCodes((prev) => [...prev, code]);
    setCurrentIndex((prev) => prev + 1);
  };

  const startLevelTest = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const request = algorithm
        ? { type: "algorithm", category: algorithm }
        : { type: "language", category: "python" };

      const problemIdList = await postLeveltest(request);
      const problemList = await getProblems(problemIdList);

      setProblems(problemList);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  return (
    <main className="min-h-screen flex flex-col justify-start items-center gap-y-24">
      {isLoading && <Spinner />}
      {problems.length > 0 && currentIndex < problems.length ? (
        <Problem
          problemName={problems[currentIndex].name}
          problemDescription={problems[currentIndex].description}
          inputDescription={problems[currentIndex].inputDescription}
          outputDescription={problems[currentIndex].outputDescription}
          language={language}
          onActionClick={
            currentIndex === problems.length - 1
              ? handleSubmit // 마지막 문제면 제출
              : handleNext // 아니면 다음 문제로
          }
        />
      ) : (
        <>
          <h1 className="mt-10 text-headlineL">레벨테스트를 진행하겠습니다</h1>
          <div className="flex flex-col gap-y-7">
            <section
              className="w-[998px] h-[275px] bg-[#F9F9F9] 
        flex flex-col justify-center items-center p-8 gap-y-9
        rounded-2xl border-[0.5px] border-main border-solid"
            >
              <h2 className="text-titleL">레벨테스트 주의사항</h2>
              <div className="w-full py-2 text-left">
                <ul className="list-disc pl-6 text-bodyL">
                  <li>제한 시간은 1시간이에요.</li>
                  <li>사용 언어는 {language}에요.</li>
                  <li>
                    테스트 내용은 ‘{algorithm ? algorithm : language + " 문법"}
                    ’(이)에요.
                  </li>
                  <li>제한 시간이 종료되거나, 종료 버튼을 누르면 종료돼요.</li>
                </ul>
              </div>
            </section>
            <Button
              label={"테스트 시작"}
              buttonStyle="!w-[998px]"
              onClick={startLevelTest}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default LevelTest;
