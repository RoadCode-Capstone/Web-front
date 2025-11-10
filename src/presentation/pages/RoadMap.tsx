import NextBtn from "../components/roadMap/NextBtn";
import PrevBtn from "../components/roadMap/PrevBtn";
import IconStar from "@assets/icons/star.svg?react";
import Character from "@assets/character/twinkle.svg?react";
import { ProblemInfo } from "../components/roadMap/ProblemInfo";
import BubbleBtn from "../components/common/CartoonButton";
export function RoadMap() {
  const currentIndex = 3;
  return (
    <>
      <ProblemInfo title={"문제 제목"} description={"문제 내용"} />
      <div className="flex items-end justify-center w-full gap-x-[116px] fixed bottom-12 ">
        <PrevBtn />
        <div className="flex items-center justify-center">
          <IconStar className="z-10 drop-shadow-[0_0_40px_#F2C53D]" />
          <span className="absolute font-bold text-4xl z-10">
            {currentIndex}
          </span>
          <div className="fixed bottom-20">
            <Character className="z-0 relative" />
            <div>
              <BubbleBtn
                text={"학습 로드맵 00% 달성 중"}
                position="right"
                style={{ "--tail-offset": "50px" }}
                className="absolute w-[259px] h-[111px] bottom-[253px] left-[-236px]"
              />
              <BubbleBtn
                text={"일일 학습 목표 달성까지\n0문제 남음"}
                position="right"
                style={{ "--tail-offset": "50px" }}
                className="absolute w-[259px] h-[111px] bottom-[104px] left-[-301px] whitespace-pre-line"
              />
              <BubbleBtn
                text={"문제 추가하기"}
                position="left"
                style={{ "--tail-offset": "40px" }}
                className="absolute w-[192px] h-[82px] bottom-[188px] right-[-179px]"
              />
              <BubbleBtn
                text={"로드맵 포기하기"}
                position="left"
                style={{ "--tail-offset": "40px" }}
                className="absolute w-[192px] h-[82px] bottom-[73px] right-[-234px]"
              />
            </div>
          </div>
        </div>
        <NextBtn />
      </div>
    </>
  );
}
