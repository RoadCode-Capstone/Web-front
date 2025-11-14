import { useEffect, useState } from "react";
import { format, getMonth, getYear } from "date-fns";
import { AttendanceCalendar } from "../components";
import BubbleBtn from "../components/common/CartoonButton";
import { HistoryList } from "../components/attendance/HistoryList";
import { getMyPoint, getMyPointByType } from "@/apis/point";
import { getPointHistoryDto, getMyPointDto } from "@/apis/dto/pointDto";

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pointHistory, setPointHistory] = useState<getPointHistoryDto[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<{
    type: string;
    totalPoint: number;
    point: number;
    dates: string[];
  } | null>(null);

  useEffect(() => {
    const fetchPointHistory = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();
        const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
        const endDate = `${year}-${String(month).padStart(2, "0")}-${String(
          lastDay
        ).padStart(2, "0")}`;
        const pointHistoryResponse = await getMyPoint(
          "date",
          startDate,
          endDate
        );
        setPointHistory(pointHistoryResponse.history || []);
        const typeHistoryResponse = await getMyPointByType(startDate, endDate);
        const attendanceData = typeHistoryResponse.history.find(
          (v) => v.type === "ATTENDANCE"
        );
        setAttendanceHistory(attendanceData || null);
      } catch (error) {
        console.error("포인트 내역을 불러오는데 실패했습니다.", error);
      }
    };
    fetchPointHistory();
  }, [currentDate]);

  return (
    <div className="flex items-center justify-center gap-x-8 h-full w-full py-10 ">
      <div className="flex flex-col max-w-[624px] min-w-[440px] gap-y-18">
        <BubbleBtn
          position="right"
          style={{ "--tail-offset": "30rem" }}
          text={`${getYear(currentDate)}년 ${getMonth(currentDate) + 1}월에 ${
            attendanceHistory?.totalPoint || 0
          }번 출석했어요`}
          className="drop-shadow-none h-[159px] font-medium text-[32px]"
        />
        <AttendanceCalendar
          date={currentDate}
          onDateChange={setCurrentDate}
          pointHistory={pointHistory}
        />
      </div>
      <HistoryList
        year={getYear(currentDate)}
        month={getMonth(currentDate) + 1}
      />
    </div>
  );
}
