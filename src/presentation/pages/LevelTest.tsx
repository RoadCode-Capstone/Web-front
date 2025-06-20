import { useState } from "react";
import { postLeveltest, postSubmission } from "../../apis/levelTest";
import { ProblemResponse } from "../../types/leveltest";
import { Button } from "../components";
import { useLocation } from "react-router-dom";
import Problem from "./Problem";
import { getProblems } from "../../apis/problem";

const Spinner = () => (
  <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

interface LevelTestProps {
  language?: "java" | "python" | "cpp";
  algorithm?: string;
}

interface CodeSubmissoion {}
const LevelTest = () => {
  const location = useLocation();
  const { language = "cpp", algorithm } = location.state as LevelTestProps;
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
