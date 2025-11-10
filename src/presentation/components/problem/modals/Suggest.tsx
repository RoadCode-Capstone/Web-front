import { useNavigate } from "react-router-dom";
import WindowBox from "../../common/WindowBox";
import Character from "@assets/character/fire.svg?react";
import BubbleBtn from "../../common/CartoonButton";

export function Suggest({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 ">
      <div className="absolute top-1/5 flex flex-col gap-y-4">
        <WindowBox
          colorTheme={"point"}
          content={<SuggestInfo />}
          style="w-[970px]! h-[343px]!"
        />
      </div>

      <div className="fixed bottom-10">
        <Character className="relative" />
        <div>
          <BubbleBtn
            text={`개념 강화 학습\n문제를 풀어보세요!`}
            position="right"
            className="h-[160px] w-[344px] absolute bottom-[350px] left-[-230px] whitespace-pre-line"
            style={{ "--tail-offset": "80px" }}
          />
          <BubbleBtn
            text="예"
            position="left"
            className="bg-[#ffa8a8] hover:bg-[#FF6565] hover:text-white 
            w-[185px] h-[94px] absolute bottom-[292px] right-[-71px]"
            style={{ "--tail-offset": "50px", "--tail-color": "#ffa8a8" }}
          />
          <BubbleBtn
            text="아니오"
            position="left"
            onClick={onClose}
            className="bg-main-teritary hover:bg-main-secondary hover:text-white 
            w-[185px] h-[94px] absolute bottom-[173px] right-[-126px]"
            style={{ "--tail-offset": "50px", "--tail-color": "#C0C3C6" }}
          />
        </div>
      </div>
    </div>
  );
}

function SuggestInfo() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[45px] text-red">틀렸습니다!</h1>
      <span className="font-light text-[22px] text-black">
        다시 시도해보세요
      </span>
    </div>
  );
}
