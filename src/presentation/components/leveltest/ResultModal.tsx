import { useNavigate } from "react-router-dom";
import WindowBox from "../common/WindowBox";
import Button from "../common/Button";
import Character from "@assets/character/happy.svg?react";

export function ResultModal({ result }: { result: number }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 ">
      <div className="absolute top-1/5 flex flex-col gap-y-4">
        <WindowBox
          colorTheme={"point"}
          content={<ResultInfo result={result} />}
          style="w-[970px]! h-[343px]!"
        />
        <div className="flex gap-x-4">
          <Button
            text={"메인페이지로 돌아가기"}
            onClick={() => navigate("/")}
            colorTheme={"main-secondary"}
            style="h-[72px]"
          />
          <Button
            text={"로드맵 시작하기"}
            onClick={() => {}}
            colorTheme={"point-secondary"}
            style="h-[72px]"
          />
        </div>
      </div>
      <Character className="absolute bottom-10" />
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
