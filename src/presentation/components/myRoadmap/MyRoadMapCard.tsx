import { cn } from "@/utils/tailwind";
export interface MyRoadMapCardProps {
  roadmapId: number;
  title: string;
  type: string;
  language: string;
  algorithm: string;
  status: string;
}

const CARD_STYLE =
  "h-[240px] w-[250px] hover:scale-105 transition-transform duration-300 ease-out\
   bg-[#F9F9F9] border-1 border-black rounded-[16px]";

export function MyRoadMapCard(props: MyRoadMapCardProps) {
  return (
    <button
      key={props.roadmapId}
      onClick={() => {}}
      className={cn(CARD_STYLE, "flex flex-col justify-between p-10")}
    >
      <div className="flex flex-col gap-y-2">
        <h1 className="text-left text-xl">{props.title}</h1>
        <div className="text-left text-sm font-light">
          <span>학습 언어: {props.language}</span>
          {props.algorithm ?? <span>학습 알고리즘: {props.algorithm}</span>}
        </div>
      </div>
      <div className="text-right">
        <ConvertStatusToKr status={props.status} />
      </div>
    </button>
  );
}

function ConvertStatusToKr({ status }: { status: string }) {
  let kr;
  if (status === "IN_PROGRESS") {
    kr = "진행 중";
    return <span className="text-point">{kr}</span>;
  } else if (status === "GAVE_UP") {
    kr = "포기";
    return <span className="text-red">{kr}</span>;
  } else if (status === "COMPLETED") {
    kr = "완료";
    return <span className="text-main">{kr}</span>;
  } else {
    kr = "알 수 없음";
    return <span className="text-black">{kr}</span>;
  }
}
