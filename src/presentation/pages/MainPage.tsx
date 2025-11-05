import BubbleBtn from "../components/common/CartoonButton";
import WindowBox from "../components/common/WindowBox";
import Character from "../assets/character/sad.svg?react";
import { Header } from "../components";

export default function Main() {
  return (
    <div className="min-h-screen min-w-screen h-screen w-screen ">
      <Header />
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
              className="w-[636px]! h-[110px]! drop-shadow-[0_0_0_rgba(0,0,0,0.25)]! text-[22px]!"
            />
            <BubbleBtn
              text={"완료한 학습 로드맵 목록 조회하기"}
              className="w-[636px]! h-[110px]! drop-shadow-[0_0_0_rgba(0,0,0,0.25)]! text-[22px]!"
            />
          </div>
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
