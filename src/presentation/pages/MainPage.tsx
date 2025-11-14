import BubbleBtn from "../components/common/CartoonButton";
import WindowBox from "../components/common/WindowBox";
import Character from "../assets/character/sad.svg?react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-y-12">
      <WindowBox
        colorTheme={"main"}
        content={<StageState />}
        width={970}
        height={343}
      />
      <div className="flex gap-x-11">
        <Character />
        <div className="flex flex-col gap-y-10">
          <BubbleBtn
            text={"새로운 학습 로드맵 만들기"}
            position="left"
            style={{ "--tail-color": "#F8E19D" }}
            className="w-[636px]! h-[110px]! drop-shadow-[0_0_0_rgba(0,0,0,0.25)]! text-[22px]! bg-point-secondary hover:bg-point-secondary-hover"
            onClick={() => navigate("/leveltest/setting")}
          />
          <BubbleBtn
            text={"완료한 학습 로드맵 목록 조회하기"}
            position="left"
            style={{ "--tail-color": "#F8E19D" }}
            className="w-[636px]! h-[110px]! drop-shadow-[0_0_0_rgba(0,0,0,0.25)]! text-[22px]! bg-point-secondary hover:bg-point-secondary-hover"
          />
        </div>
      </div>
    </div>
  );
}

function StageState() {
  return (
    <div>
      <h1 className="font-bold text-[45px] text-white">
        ⚠️ 현재 학습 중인 로드맵이 없어요
      </h1>
      <span className="font-light text-[22px] text-white">
        아래 [새로운 학습 로드맵 만들기] 버튼을 눌러 학습 로드맵을 생성해 주세요
      </span>
    </div>
  );
}
