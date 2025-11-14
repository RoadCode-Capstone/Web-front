// src/components/Leaderboard.tsx
import { rankingDetailDto } from "@/apis/dto/pointDto";
import { useState } from "react";

interface RankingTableProps {
  ranks: rankingDetailDto[];
}

export function RankingTable(props: RankingTableProps) {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil(props.ranks.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentData = props.ranks.slice(start, end);

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
    <div className="w-full flex h-full flex-col min-w-[816px] justify-between bg-[#f9f9f9] rounded-2xl border-[0.5px] border-main overflow-hidden py-6 px-14">
      <table className="w-full table-auto border-collapse">
        <thead className="border-b-1">
          <tr>
            <th className="text-center font-medium text-[22px] py-2">순위</th>
            <th className="text-center font-medium text-[22px]">이름</th>
            <th className="text-center font-medium text-[22px]">포인트</th>
          </tr>
        </thead>
        <tbody>
          {currentData
            .sort((a: rankingDetailDto, b: rankingDetailDto) => {
              return b.totalPoint - a.totalPoint;
            })
            .map((user) => (
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
                <td className="font-light px-6">{user.nickname}</td>
                <td className="font-light text-right">{user.totalPoint}</td>
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
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`hover:bg-main-secondary/30 font-light text-xs text-black rounded w-4 h-4 ${
              p === page ? "bg-main-tertiary" : ""
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded text-main-secondary"
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
