import Character from "@assets/character/fire.svg?react";
import BubbleBtn from "../components/common/CartoonButton";
import { RankingTable } from "../components/ranking/RankingTable";

export function RankingPage() {
  return (
    <div className="flex items-end justify-center gap-x-8 h-full w-full py-10 px-100">
      <RankingTable />
      <div className="">
        <BubbleBtn
          position="left"
          text={"000님은 현재\n000위(상위 00%)"}
          className="w-[448px] h-[280px] font-bold whitespace-pre-line"
          lineStyles={["text-[36px]", "text-[45px]"]}
          style={{ "--tail-offset": "280px" }}
        />
        <Character />
      </div>
    </div>
  );
}
