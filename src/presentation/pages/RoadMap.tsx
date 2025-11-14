import NextBtn from "../components/roadMap/NextBtn";
import PrevBtn from "../components/roadMap/PrevBtn";
import IconStar from "@assets/icons/star.svg?react";
import Character from "@assets/character/twinkle.svg?react";
import { ProblemInfo } from "../components/roadMap/ProblemInfo";
import BubbleBtn from "../components/common/CartoonButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoadmap, getRoadmapProblems } from "@/apis/roadMap";
import { RoadmapProblem } from "@/types/roadmap";
import { getProblem, getProblems } from "@/apis/problem";
import { problemRes } from "@/apis/dto/problemDto";

export function RoadMap() {
  const currentIndex = 3;

  const navigate = useNavigate();
  const { state: roadmapId } = useLocation();

  const [inprogOrder, setInprogOrder] = useState<number>(0);
  const [currentProblemOrder, setCurrentProblemOrder] = useState<number>(0);
  const [problems, setProblems] = useState<RoadmapProblem[]>([]);
  const [currProblem, setCurrProblem] = useState<problemRes>();

  useEffect(() => {
    if (!roadmapId) {
      alert("잘못된 접근입니다. 메인 페이지로 이동합니다.");
      navigate("/");
    }
    if (roadmapId) {
      const handleRoadmap = async () => {
        try {
          // 1. 로드맵 진행 상태 및 문제 목록 가져오기
          const roadmap = await getRoadmap(roadmapId);
          const problemsResponse = await getRoadmapProblems(roadmapId);
          const allProblems = problemsResponse.roadmapProblems;
          const currentOrder = roadmap.currentProblem.order;

          // 2. 현재 순서에 맞는 문제 ID로 문제 정보 가져오기
          const currentProblemId = allProblems[currentOrder].problemId;
          const problemResponse = await getProblem(currentProblemId);

          // 3. 모든 상태 한 번에 업데이트
          setProblems(allProblems);
          setCurrentProblemOrder(currentOrder);
          setInprogOrder(currentOrder);
          setCurrProblem(problemResponse);
        } catch (error) {
          console.error("로드맵 정보를 불러오는 데 실패했습니다.", error);
          alert("로드맵 정보를 불러오는 데 실패했습니다.");
        }
      };

      handleRoadmap();
    }
  }, [roadmapId, navigate]);

  const handleNext = async () => {
    if (currentProblemOrder >= problems.length - 1) {
    } else {
      setCurrentProblemOrder((currentProblemOrder) => currentProblemOrder + 1);
      const currentProblemId = problems[currentProblemOrder].problemId;
      const problemResponse = await getProblem(currentProblemId);
      setCurrProblem(problemResponse);
    }
  };

  const handlePrev = async () => {
    if (currentProblemOrder <= 0) {
    } else {
      setCurrentProblemOrder((currentProblemOrder) => currentProblemOrder - 1);
      const currentProblemId = problems[currentProblemOrder].problemId;
      const problemResponse = await getProblem(currentProblemId);
      setCurrProblem(problemResponse);
    }
  };

  return (
    <>
      <ProblemInfo
        title={currProblem?.name || "오류 발생"}
        description={currProblem?.description || "오류 발생"}
      />
      <div className="flex items-end justify-center w-full gap-x-[116px] fixed bottom-12 ">
        <PrevBtn onClick={handlePrev} />
        <div className="flex items-center justify-center">
          <IconStar className="z-10 drop-shadow-[0_0_40px_#F2C53D]" />
          <span className="absolute font-bold text-4xl z-10">
            {currentProblemOrder + 1}
          </span>
          <div className="fixed bottom-20">
            <Character className="z-0 relative" />
            <div>
              <BubbleBtn
                text={`학습 로드맵 ${
                  (inprogOrder / problems.length) * 100
                }% 달성 중`}
                position="right"
                style={{ "--tail-offset": "50px", "--tail-color": "#F8E19D" }}
                className="absolute w-[259px] h-[111px] bottom-[253px] left-[-236px]  bg-point-secondary"
              />
              <BubbleBtn
                text={"일일 학습 목표 달성까지\n0문제 남음"}
                position="right"
                style={{ "--tail-offset": "50px" }}
                className="absolute w-[259px] h-[111px] bottom-[104px] left-[-301px] whitespace-pre-line"
              />
              <BubbleBtn
                text={"문제 추가하기"}
                position="left"
                style={{ "--tail-offset": "40px", "--tail-color": "#FBF0CE" }}
                className="absolute w-[192px] h-[82px] bottom-[188px] right-[-179px] bg-point-teritary hover:bg-point-secondary"
              />
              <BubbleBtn
                text={"로드맵 포기하기"}
                position="left"
                style={{ "--tail-offset": "40px", "--tail-color": "#FBF0CE" }}
                className="absolute w-[192px] h-[82px] bottom-[73px] right-[-234px] bg-point-teritary hover:bg-point-secondary"
              />
            </div>
          </div>
        </div>
        <NextBtn onClick={handleNext} />
      </div>
    </>
  );
}
