import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import WindowBox from "../../common/WindowBox";
import Character from "@assets/character/happy.svg?react";

export function Fail({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 ">
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
            text={"다시 풀기"}
            onClick={onClose}
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
      <h1 className="font-bold text-[45px] text-red">틀렸습니다!</h1>
      <span className="font-light text-[22px] text-black">
        다시 시도해보세요
      </span>
    </div>
  );
}
