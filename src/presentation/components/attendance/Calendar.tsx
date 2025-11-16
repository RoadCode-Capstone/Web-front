import React, { useMemo } from "react";
import Calendar from "react-calendar";
import { format, isSameDay, isWeekend } from "date-fns";
import IconPrev from "@assets/icons/chevron_backward.svg?react";
import IconNext from "@assets/icons/chevron_forward.svg?react";
import {
  getPointHistoryDto,
  getTypeHistoryDto,
  pointDetailDto,
} from "@/apis/dto/pointDto";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface AttendanceCalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  pointHistory: getPointHistoryDto[] | null;
}

export default function AttendanceCalendar({
  date: value,
  onDateChange,
  pointHistory,
}: AttendanceCalendarProps) {
  const pointHistoryMap = useMemo(() => {
    if (!pointHistory) return {};
    const map: Record<string, pointDetailDto[]> = {};
    for (const history of pointHistory) {
      // Assuming history.date is in "YYYY-MM-DD" format
      map[history.date] = history.pointDetails;
    }
    return map;
  }, [pointHistory]);
  const handleCalendarChange = (newValue: Value) => {
    // 타입 가드: newValue가 Date 객체인지 확인합니다.
    if (newValue instanceof Date) {
      onDateChange(newValue);
    } else {
      // (참고) 범위 선택(range)을 사용한다면 이 부분을 수정해야 합니다.
      // 여기서는 범위가 아니거나(null) 범위의 시작 날짜를 선택합니다.
      const firstValue = Array.isArray(newValue) ? newValue[0] : newValue;
      if (firstValue) {
        onDateChange(firstValue);
      }
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Calendar
        // --- 1. 타입 에러 해결 ---
        onChange={handleCalendarChange}
        value={value}
        // --- 2. Tailwind 스타일링 (Props) ---

        // (A) 캘린더 전체 컨테이너
        className="mx-auto flex flex-col rounded-lg  p-4 "
        // (B) 상단 네비게이션 (월/연도)
        navigationLabel={({ date }) => (
          <h1 className="text-2xl font-medium text-black">
            {format(date, "yyyy년 MM월")}
          </h1>
        )}
        prevLabel={
          <button className="rounded-md py-2 px-3 hover:bg-gray-100">
            <IconPrev />
          </button>
        }
        nextLabel={
          <button className="rounded-md  py-2 px-3 hover:bg-gray-100">
            <IconNext />
          </button>
        }
        prev2Label={null} // 2단계 이전 버튼 (연도) 숨기기
        next2Label={null} // 2단계 다음 버튼 (연도) 숨기기
        // (C) 요일 헤더 (S, M, T...)
        // 5. formatShortWeekday 에러 해결: JSX가 아닌 순수 'string'을 반환합니다.
        //    스타일링은 2부(CSS)에서 @apply로 처리합니다.
        formatShortWeekday={(locale, date) => format(date, "E")[0]} // 'S', 'M', 'T'...
        formatDay={(locale, date) => format(date, "d")}
        // (D) 날짜 타일 (가장 중요!)
        // 'tileClassName'을 사용하여 조건부 Tailwind 클래스를 적용합니다.
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const classes = [
              "rounded-lg",
              "p-2",
              "text-center",
              "aspect-square",
              "hover:bg-gray-100",
            ];

            const dateStr = format(date, "yyyy-MM-dd");
            const point = pointHistoryMap[dateStr];
            if (point) {
              if (
                point.find((p) => p.type === "ATTENDANCE") &&
                point.find((p) => p.type === "DAILY_GOAL_COMPLETED")
              ) {
                classes.push("bg-point-secondary-hover"); // 출석 + 데일리 목표
              } else if (point.find((p) => p.type === "ATTENDANCE")) {
                classes.push("bg-point-teritary"); // 출석만
              } else {
                classes.push("bg-transparent");
              }
            } else {
              classes.push("bg-transparent");
            }

            // 1. 현재 렌더링되는 날짜(date)가
            //    state에 저장된 날짜(value)와 같은지 확인합니다.
            const isSelected = value && isSameDay(date, value);

            // 3. [핵심] '선택된 날짜'에만 하이라이트 스타일을 적용합니다.
            if (isSelected) {
              classes.push("border-2", "border-blue-500", "font-bold");
            }

            return classes.join(" ");
          }
          return "";
        }}
      />
    </div>
  );
}
