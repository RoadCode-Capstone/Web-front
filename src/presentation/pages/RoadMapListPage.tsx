import { getMyRoadmaps } from "@/apis/roadMap";
import { RoadMapDetailDto } from "@/types/roadmap";
import { useEffect, useMemo, useState } from "react";
import { NoRoadMap } from "../components/myRoadmap/NoRoadMap";
import { MyRoadMapCard } from "../components/myRoadmap/MyRoadMapCard";

type RoadMapStatusType = "IN_PROGRESS" | "COMPLETED" | "GAVE_UP";

export default function RoadMapListPage() {
  const [roadMaps, setRoadMaps] = useState<RoadMapDetailDto[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    RoadMapStatusType | "ALL"
  >("ALL");

  useEffect(() => {
    const fetchMyRoadmap = async () => {
      try {
        const response = await getMyRoadmaps();
        setRoadMaps(response.roadmaps);
      } catch (error) {
        console.error("로드맵을 불러오는데 실패했습니다.", error);
      }
    };
    fetchMyRoadmap();
  }, []);

  const filteredRoadMaps = useMemo(() => {
    if (selectedStatus === "ALL") {
      return roadMaps;
    }
    return roadMaps.filter((roadmap) => roadmap.status === selectedStatus);
  }, [roadMaps, selectedStatus]);

  return roadMaps.length > 0 ? (
    <div className="flex flex-col h-full w-full items-center justify-start pt-10 gap-y-10">
      <h1 className="font-bold text-2xl">로드맵 목록 조회</h1>
      <div className="flex gap-x-4">
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            id="status"
            value="ALL"
            checked={selectedStatus === "ALL"}
            onChange={(e) => setSelectedStatus(e.target.value as "ALL")}
          />
          <label htmlFor="status">전체</label>
        </div>
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            id="status"
            value="COMPLETED"
            checked={selectedStatus === "COMPLETED"}
            onChange={(e) =>
              setSelectedStatus(e.target.value as RoadMapStatusType)
            }
          />
          <label htmlFor="status">완료</label>
        </div>
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            id="status"
            value="GAVE_UP"
            checked={selectedStatus === "GAVE_UP"}
            onChange={(e) =>
              setSelectedStatus(e.target.value as RoadMapStatusType)
            }
          />
          <label htmlFor="status">포기</label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredRoadMaps.map((props) => (
          <MyRoadMapCard {...props} />
        ))}
      </div>
    </div>
  ) : (
    <NoRoadMap />
  );
}
