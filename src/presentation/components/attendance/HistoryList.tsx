import { getSubmission, getSubmissions } from "@/apis/submission";
import ProblemTable from "./ProblemTable";
import { submissionDto } from "@/apis/dto/submissionDto";
import { useEffect, useState } from "react";

interface HistoryListProps {
  year: number;
  month: number;
}

export function HistoryList(props: HistoryListProps) {
  const [data, setData] = useState<submissionDto[]>([]);

  useEffect(() => {
    const handleHistory = async () => {
      try {
        const lastDay = new Date(props.year, props.month, 0).getDate();
        const startDate = `${props.year}-${String(props.month).padStart(
          2,
          "0"
        )}-01`;
        const endDate = `${props.year}-${String(props.month).padStart(
          2,
          "0"
        )}-${String(lastDay).padStart(2, "0")}`;
        const response = await getSubmissions(startDate, endDate);
        setData(response.history || []);
      } catch (error) {
        alert(error instanceof Error ? error.message : "알 수 없는 오류 발생");
      }
    };

    handleHistory();
  }, [props.year, props.month]);

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
      <ProblemTable data={data} />
    </div>
  );
}
