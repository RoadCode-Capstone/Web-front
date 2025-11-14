import { getMyRoadmaps } from "@/apis/roadMap";
import { RoadMapDetailDto } from "@/types/roadmap";
import { useEffect, useState } from "react";
import { NoRoadMap } from "../components/myRoadmap/NoRoadMap";

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
    <div className="grid grid-cols-3"></div>
  ) : (
    <NoRoadMap />
  );
}
