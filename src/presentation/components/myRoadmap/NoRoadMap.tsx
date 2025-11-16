import { useNavigate } from "react-router-dom";
import Button from "@/presentation/components/common/Button";
import WindowBox from "@/presentation/components/common/WindowBox";
import Character from "@assets/character/sad.svg?react";

export function NoRoadMap() {
  const navigate = useNavigate();
  return (
    <div className=" inset-0 bg-black/50 flex justify-center w-full h-full ">
      <div className="absolute top-1/5 flex flex-col gap-y-4">
        <WindowBox
          colorTheme={"point"}
          content={<FailInfo />}
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
            text={"새로운 학습 로드맵 만들기"}
            onClick={() => navigate("/leveltest/setting")}
            colorTheme={"point-secondary"}
            style="h-[72px]"
          />
        </div>
      </div>
      <Character className="absolute bottom-10" />
    </div>
  );
}

function FailInfo() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[45px] text-red">로드맵 내역이 없습니다</h1>
      <span className="font-light text-[22px] text-black">
        [새로운 학습 로드맵 만들기]를 통해서 학습을 시작해보세요!
      </span>
    </div>
  );
}
