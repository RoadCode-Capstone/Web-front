import { postLeveltest } from "@/apis/levelTest";
import BubbleBtn from "../common/CartoonButton";
import { TestInfoBox } from "./TestInfoBox";
import Character from "@assets/character/study_hard.svg?react";
import { LanguageType } from "@/types/problem";
import { getProblems } from "@/apis/problem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TestInfoProps {
  language: LanguageType;
  type: string;
  algorithm?: string;
  dailyGoal: number;
}
export function TestInfo(props: TestInfoProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      const response = await postLeveltest({
        language: props.language,
        type: props.type,
        algorithm: props.algorithm,
      });
      const problemIds: number[] = response.problemIds;
      const problemsResponse = await getProblems(problemIds);
      const problems = problemsResponse.problems;
      setIsLoading(false);
      navigate("/leveltest", {
        state: {
          language: props.language,
          problems: problems,
          type: props.type,
          algorithm: props.algorithm,
          dailyGoal: props.dailyGoal,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex mt-10 justify-center">
      <div className="relative inline-block">
        <TestInfoBox
          language={props.language}
          type={props.type}
          algorithm={props.algorithm}
        />
        <div className="absolute bottom-[-250px] left-[-140px] flex items-center pt-4">
          <Character className=" " />
          <BubbleBtn
            onClick={handleOnClick}
            text={"레벨테스트 시작하기"}
            className="h-[110px] mt-11 text-[22px] w-[714px] drop-shadow-[0_0_0_0]"
          />
        </div>
      </div>
    </div>
  );
}
