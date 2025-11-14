import { getMyRoadmaps } from "@/apis/roadMap";
import { RoadMapDetailDto } from "@/types/roadmap";
import { useEffect, useState } from "react";
import { NoRoadMap } from "../components/myRoadmap/NoRoadMap";
import { MyRoadMapCard } from "../components/myRoadmap/MyRoadMapCard";

type RoadMapStatusType = "IN_PROGRESS" | "COMPLETED" | "GAVE_UP";

export default function RoadMapListPage() {
  const [roadMaps, setRoadMaps] = useState<RoadMapDetailDto[]>([]);
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

  return roadMaps.length > 0 ? (
    <div className="flex flex-col h-full w-full items-center justify-start pt-10 gap-y-10">
      <h1 className="font-bold text-2xl">로드맵 목록 조회</h1>
      <div className="grid grid-cols-3 gap-4">
        {roadMaps.map((props) => (
          <MyRoadMapCard {...props} />
        ))}
      </div>
    </div>
  ) : (
    <NoRoadMap />
  );
}
