import BubbleBtn from "../common/CartoonButton";
import { TestInfoBox } from "./TestInfoBox";
import Character from "@assets/character/study_hard.svg?react";

interface TestInfoProps {
  language: string;
  type: string;
  algorithm?: string;
}
export function TestInfo(props: TestInfoProps) {
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
            text={"레벨테스트 시작하기"}
            className="h-[110px] mt-11 text-[22px] w-[714px] drop-shadow-[0_0_0_0]"
          />
        </div>
      </div>
    </div>
  );
}
