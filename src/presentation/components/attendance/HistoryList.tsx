import ProblemTable from "./ProblemTable";

interface HistoryListProps {
  year: number;
  month: number;
}

export function HistoryList(props: HistoryListProps) {
  return (
    <div
      className="flex flex-col items-center justify-start
      h-full w-full min-w-[500px] max-w-[624px]
     px-10 pt-12 pb-8 gap-y-12
     bg-[#f9f9f9] border-main border-1 rounded-2xl"
    >
      <h1 className="font-medium text-[28px]">
        {props.year}년 {props.month}월에 풀이한 문제 목록
      </h1>
      <ProblemTable />
    </div>
  );
}
