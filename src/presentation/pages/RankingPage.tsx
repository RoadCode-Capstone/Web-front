import Character from "@assets/character/fire.svg?react";
import BubbleBtn from "../components/common/CartoonButton";
import { RankingTable } from "../components/ranking/RankingTable";
import { getRanking } from "@/apis/point";
import { useEffect, useState } from "react";
import { rankingDetailDto } from "@/apis/dto/pointDto";

export function RankingPage() {
  const [myRank, setMyRank] = useState<number>();
  const [ranks, setRanks] = useState<rankingDetailDto[]>([]);
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();
        const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
        const endDate = `${year}-${String(month).padStart(2, "0")}-${String(
          lastDay
        ).padStart(2, "0")}`;
        const response = await getRanking(startDate, endDate);
        setMyRank(response.myRank);
        setRanks(response.ranks);
      } catch (error) {
        console.error("포인트 내역을 불러오는데 실패했습니다.", error);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div className="flex items-end justify-center gap-x-8 h-full w-full py-10 px-100">
      <RankingTable ranks={ranks} />
      <div className="">
        <BubbleBtn
          position="left"
          text={`나는 현재\n${myRank}위`}
          className="w-[448px] h-[280px] font-bold whitespace-pre-line cursor-none bg-point-secondary"
          lineStyles={["text-[36px]", "text-[45px]"]}
          style={{ "--tail-offset": "280px", "--tail-color": "#F8E19D" }}
        />
        <Character />
      </div>
    </div>
  );
}
