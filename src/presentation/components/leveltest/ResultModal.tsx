import { useNavigate } from "react-router-dom";
import WindowBox from "../common/WindowBox";
import Button from "../common/Button";
import Character from "@assets/character/happy.svg?react";
import CharacterSearching from "@assets/character/searching.svg?react";
import { postRoadmap } from "@/apis/roadMap";
import { LanguageType } from "@/types/problem";
import { useState } from "react";

interface ResultModalProps {
  passedCount: number;
  type: string;
  language: LanguageType;
  algorithm?: string;
  dailyGoal: number;
  levelTestResult: number;
}
export function ResultModal(props: ResultModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePostRoadmap = async () => {
    setIsLoading(true);
    const response = await postRoadmap({
      type: props.type,
      language: props.language,
      algorithm: props.algorithm,
      dailyGoal: props.dailyGoal,
      levelTestResult: props.levelTestResult,
    });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 ">
      <div className="absolute top-1/5 flex flex-col gap-y-4">
        <WindowBox
          colorTheme={"point"}
          content={
            isLoading ? (
              <LoadingInfo />
            ) : (
              <ResultInfo result={props.passedCount} />
            )
          }
          style="w-[970px]! h-[343px]!"
        />
        {!isLoading && (
          <div className="flex gap-x-4">
            <Button
              text={"메인페이지로 돌아가기"}
              onClick={() => navigate("/")}
              colorTheme={"main-secondary"}
              style="h-[72px]"
            />
            <Button
              text={"로드맵 생성하기"}
              onClick={handlePostRoadmap}
              colorTheme={"point-secondary"}
              style="h-[72px]"
            />
          </div>
        )}
      </div>
      {isLoading ? (
        <CharacterSearching className="absolute bottom-10" />
      ) : (
        <Character className="absolute bottom-10" />
      )}
    </div>
  );
}

function ResultInfo({ result }: { result: number }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[45px] text-point">
        {result}문제 맞았습니다!
      </h1>
    </div>
  );
}

function LoadingInfo() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[45px] text-point">
        로드맵을 생성하고 있습니다
      </h1>
    </div>
  );
}
