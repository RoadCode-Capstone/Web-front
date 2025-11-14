import { useState } from "react";
import { format, getMonth, getYear } from "date-fns";
import { AttendanceCalendar } from "../components";
import BubbleBtn from "../components/common/CartoonButton";
import { HistoryList } from "../components/attendance/HistoryList";

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // const getAttendanceHistory = async () => {
  //   const response = await getMyPoint
  // }

  return (
    <div className="flex items-center justify-center gap-x-8 h-full w-full py-10 ">
      <div className="flex flex-col max-w-[624px] min-w-[440px] gap-y-18">
        <BubbleBtn
          position="right"
          style={{ "--tail-offset": "30rem" }}
          text={`${getYear(currentDate)}년 ${
            getMonth(currentDate) + 1
          }월에 13번 출석했어요`}
          className="drop-shadow-none h-[159px] font-medium text-[32px]"
        />
        <AttendanceCalendar date={currentDate} onDateChange={setCurrentDate} />
      </div>
      <HistoryList
        year={getYear(currentDate)}
        month={getMonth(currentDate) + 1}
      />
    </div>
  );
}
