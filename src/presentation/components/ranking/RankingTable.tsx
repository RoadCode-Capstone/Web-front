// src/components/Leaderboard.tsx
import { useState } from "react";

interface User {
  rank: number;
  name: string;
  points: number;
}

const sampleData: User[] = [
  { rank: 1, name: "first", points: 500 },
  { rank: 2, name: "second", points: 400 },
  { rank: 3, name: "third", points: 300 },
  { rank: 4, name: "fourth", points: 200 },
  { rank: 5, name: "name", points: 150 },
];

export function RankingTable() {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentData = sampleData.slice(start, end);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"; // 1위 금색
      case 2:
        return "text-gray-400"; // 2위 은색
      case 3:
        return "text-orange-400"; // 3위 동색
      default:
        return "text-main"; // 나머지
    }
  };

  return (
    <div className="w-full flex h-full flex-col justify-between bg-[#f9f9f9] rounded-2xl border-[0.5px] border-main overflow-hidden py-6 px-14">
      <table className="w-full table-auto border-collapse">
        <thead className="border-b-1">
          <tr>
            <th className="text-center font-medium text-[22px] py-2">순위</th>
            <th className="text-center font-medium text-[22px]">이름</th>
            <th className="text-center font-medium text-[22px]">포인트</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => (
            <tr
              key={user.rank}
              className="border-b-[0.5px] border-main  text-[22px]"
            >
              <td
                className={`font-medium text-center py-6 ${getRankColor(
                  user.rank
                )}`}
              >
                {user.rank}
              </td>
              <td className="font-light px-6">{user.name}</td>
              <td className="font-light text-right">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-x-8 py-4 bg-gray-50">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded text-main-secondary"
        >
          &lt;
        </button>
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`font-light text-xs text-black rounded w-4 h-4 ${
              p === page ? "bg-main-teritary " : ""
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded text-main-secondary"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
