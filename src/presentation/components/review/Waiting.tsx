import WindowBox from "@/presentation/components/common/WindowBox";
import Character from "@assets/character/searching.svg?react";

export function WaitingModal() {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 ">
      <div className="absolute top-1/5">
        <WindowBox
          colorTheme={"point"}
          content={<ScoringInfo />}
          style="w-[970px]! h-[343px]!"
        />
      </div>
      <Character className="absolute bottom-10" />
    </div>
  );
}

function ScoringInfo() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[45px] text-point">
        AI가 적절한 댓글인지 확인하고 있어요
      </h1>
      <span className="font-light text-[22px] text-black">
        잠시만 기다려주세요
      </span>
    </div>
  );
}
