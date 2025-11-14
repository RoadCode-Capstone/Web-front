import React, { useState, useMemo } from "react";
import IconDown from "@assets/icons/down.svg?react";
import IconUp from "@assets/icons/up.svg?react";
import { getSubmissionsDto, submissionDto } from "@/apis/dto/submissionDto";

// --- API 데이터 ---
// const apiResponse = {
//   data: {
//     history: [
//       {
//         date: "2025-09-14",
//         submissionDetails: [
//           {
//             problemId: 2195,
//             problemName: "Hello World 출력",
//             submissionId: 282,
//             isSuccess: false,
//           },
//           {
//             problemId: 2195,
//             problemName: "Hello World 출력",
//             submissionId: 283,
//             isSuccess: false,
//           },
//           {
//             problemId: 373,
//             problemName: "D. 비밀 비밀번호",
//             submissionId: 284,
//             isSuccess: false,
//           },
//         ],
//       },
//       {
//         date: "2025-09-27",
//         submissionDetails: [
//           {
//             problemId: 2195,
//             problemName: "Hello World 출력",
//             submissionId: 304,
//             isSuccess: false,
//           },
//           {
//             problemId: 2195,
//             problemName: "Hello World 출력",
//             submissionId: 305,
//             isSuccess: true,
//           },
//         ],
//       },
//     ],
//   },
// };

// --- 데이터 변환 ---
const processApiData = (history: submissionDto[] = []) =>
  history
    .map((daily) => {
      const problemsById = daily.submissionDetails.reduce(
        (acc: Record<number, any>, sub, idx) => {
          if (!acc[sub.problemId]) {
            acc[sub.problemId] = {
              problemId: sub.problemId,
              problemName: sub.problemName,
              attempts: [], // 성공한 시도만 담을 배열
            };
          }
          // 성공한 경우에만 시도 목록에 추가
          if (sub.isSuccess) {
            acc[sub.problemId].attempts.push({
              submissionId: sub.submissionId,
              isSuccess: sub.isSuccess,
              label: `[정답] 풀이 시도 ${idx + 1}`,
              buttonText: "문제 및 리뷰 보기",
              variant: "highlight",
            });
          }
          return acc;
        },
        {}
      );

      // 성공한 시도가 하나라도 있는 문제만 필터링
      const successfulProblems = Object.values(problemsById).filter(
        (p) => p.attempts.length > 0
      );

      return {
        date: daily.date,
        problems: successfulProblems,
      };
    })
    .filter((daily) => daily.problems.length > 0);

const formatDate = (date: string) => date.split("-")[2];

// --- 메인 컴포넌트 ---
export default function ProblemTable({ data }: { data: submissionDto[] }) {
  const processedData = useMemo(() => processApiData(data), [data]);

  const defaultExpandedId = processedData[0]?.problems[0]
    ? `${processedData[0].date}-${processedData[0].problems[0].problemId}`
    : null;

  const [expandedId, setExpandedId] = useState(defaultExpandedId);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full text-sm">
      {/* 헤더 */}
      <div className="flex w-full pb-2 border-b border-gray-300">
        <div className="w-1/6 pl-4 font-medium text-xl text-black">날짜</div>
        <div className="w-full text-center font-medium text-xl text-black">
          문제 제목
        </div>
      </div>

      {/* 바디 */}
      {processedData.map((daily) => (
        <React.Fragment key={daily.date}>
          {daily.problems.map((problem, idx) => {
            const id = `${daily.date}-${problem.problemId}`;
            const isExpanded = expandedId === id;
            const showDate = idx === 0;

            return (
              <div
                key={id}
                className="border-b border-gray-200 last:border-b-0"
              >
                {/* 문제 행 */}
                <div
                  className="flex w-full items-center py-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggle(id)}
                >
                  <div className="w-1/6 pl-4">
                    {showDate && (
                      <span className="font-bold text-base text-gray-900">
                        {formatDate(daily.date)}
                      </span>
                    )}
                  </div>
                  <div className="w-5/6 flex justify-between items-center pr-4">
                    <span className="text-base text-gray-900">
                      {problem.problemName}
                    </span>
                    {isExpanded ? (
                      <IconUp width={24} height={12} />
                    ) : (
                      <IconDown width={24} height={12} color="#94999F" />
                    )}
                  </div>
                </div>

                {/* 풀이 시도 */}
                {isExpanded && (
                  <div className="pb-5 pt-1 pl-[16.666%] pr-4 space-y-3">
                    {problem.attempts.map((a: any) => (
                      <div
                        key={a.submissionId}
                        className="flex justify-between items-center"
                      >
                        <span
                          className={`text-sm ${
                            a.isSuccess ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          {a.label}
                        </span>
                        <button
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            a.variant === "highlight"
                              ? "bg-yellow-400 text-black hover:bg-yellow-500"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {a.buttonText}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
