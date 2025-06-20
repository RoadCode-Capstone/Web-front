import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import {
  getRoadmap,
  getRoadmapProblems,
  getRoadmaps,
} from "../../apis/roadMap";
import { RoadmapProblem, RoadmapResponse } from "../../types/roadmap";
import { useState, useEffect } from "react";
import { ProblemResponse } from "../../types/leveltest";
import { getProblem } from "../../apis/problem";
import IconButton from "../components/common/IconButton";

function stripHtmlAndTruncate(html: string, maxLength: number): string {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const text = tempElement.textContent || tempElement.innerText || "";

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

const Main = () => {
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [problem, setProblem] = useState<ProblemResponse | null>(null);
  const [problemList, setProblemList] = useState<RoadmapProblem[]>([]);
  const [order, setOrder] = useState<number>(0);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const roadmaps = await getRoadmaps();
        const inProgressRoadmap = roadmaps.find(
          (r) => r.status === "IN_PROGRESS"
        );

        if (inProgressRoadmap) {
          const fullRoadmap = await getRoadmap(inProgressRoadmap.roadmapId);
          setRoadmap(fullRoadmap);
          setOrder(fullRoadmap.currentProblem.order);
          setInProgress(true);

          const problems = await getRoadmapProblems(
            inProgressRoadmap.roadmapId
          );
          setProblemList(problems);

          const problem = await getProblem(
            fullRoadmap.currentProblem.problemId
          );
          setProblem(problem);
        }
      } catch (err) {
        console.error("로드맵 불러오기 실패:", err);
      }
    };

    fetchRoadmap();
  }, []);

  const handleOrder = async (order: number) => {
    const nextProblem = problemList.find((problem) => problem.order == order);
    if (nextProblem == undefined) {
      alert(`${order}번째 문제는 존재하지 않습니다.`);
      return;
    }
    const nextProblemDetail = await getProblem(nextProblem.problemId);
    setProblem(nextProblemDetail);
    setOrder(order);
  };

  return (
    <main className="h-full w-full bg-main flex flex-col items-center">
      {inProgress && roadmap && problem ? (
        <div className="w-[80%] h-full flex justify-between items-center">
          <IconButton
            type="button"
            iconProps={{ name: "left", color: "white", size: 64 }}
            onClick={() => handleOrder(order - 1)}
          />
          <div className="w-[60%] flex flex-col gap-y-10 ">
            <div className="flex flex-col gap-y-8">
              <h1 className="text-point text-headlineL">
                {order + 1} 번째 문제
              </h1>
              <h2 className="text-white text-headlineL">{problem.name}</h2>
              <p className="text-white">
                {stripHtmlAndTruncate(problem.description, 100)}
              </p>
            </div>
            <Button label="학습 시작하기" type="button" />
          </div>
          <IconButton
            type="button"
            iconProps={{ name: "right", color: "white", size: 64 }}
            onClick={() => handleOrder(order + 1)}
          />
        </div>
      ) : (
        <div className="w-[80%]">
          <section className="text-displayL text-white text-left flex items-start mt-40">
            진행 중인
            <br />
            학습 로드맵이 없습니다
          </section>
          <section className="mt-40 flex flex-col items-end">
            <Button
              label="완료한 학습 로드맵 목록 조회 >>"
              buttonStyle="bg-transparent text-displayS !text-point"
            />
            <Button
              label="학습 로드맵 만들기 >>"
              buttonStyle="bg-transparent text-displayS !text-point"
              onClick={() => navigate("/newRoadMap")}
            />
          </section>
        </div>
      )}
    </main>
  );
};

export default Main;
