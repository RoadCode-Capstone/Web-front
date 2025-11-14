import { useNavigate } from "react-router-dom";
import Button from "@/presentation/components/common/Button";
import WindowBox from "@/presentation/components/common/WindowBox";
import Character from "@assets/character/happy.svg?react";

export function Correct({ problemId }: { problemId: number | undefined }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 ">
      <div className="absolute top-1/5 flex flex-col gap-y-4">
        <WindowBox
          colorTheme={"point"}
          content={<CorrectInfo />}
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
            text={"다른 사람 풀이 보기"}
            onClick={() => {
              if (problemId) navigate(`/others-review/${problemId}`);
            }}
            colorTheme={"point-secondary"}
            style="h-[72px]"
          />
        </div>
      </div>
      <Character className="absolute bottom-10" />
    </div>
  );
}

function CorrectInfo() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[45px] text-[#87BCED]">맞았습니다!</h1>
      <span className="font-light text-[22px] text-black">
        [리뷰 보기]를 클릭하여 코드 분석 결과를 확인해보세요!
      </span>
    </div>
  );
}
