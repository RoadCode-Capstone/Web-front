import NextBtn from "../components/roadMap/NextBtn";
import PrevBtn from "../components/roadMap/PrevBtn";
import IconStar from "@assets/icons/star.svg?react";
import Character from "@assets/character/twinkle.svg?react";
import { ProblemInfo } from "../components/roadMap/ProblemInfo";
import BubbleBtn from "../components/common/CartoonButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "../components/common/spinner";
import { useRoadmapStore } from "@/stores/roadmapStore"; // 스토어 import
import { postConceptProblem, postRecommendProblem } from "@/apis/roadMap";

export default function RoadMap() {
  const navigate = useNavigate();
  const {
    isLoading,
    inProgProblem,
    roadmapId,
    currentProblemId,
    problems,
    currProblem,
    language,
    dailyRemainedCount,
    fetchRoadmapData,
    setCurrentProblemById,
    giveUp,
    getProblemIndex,
    getCurrentProblemDetail,
  } = useRoadmapStore();

  useEffect(() => {
    fetchRoadmapData(() => navigate("/none"));
  }, []);

  const handleNext = async () => {
    const index = getProblemIndex();
    if (index >= problems.length - 1) {
    } else {
      const nextIndex = index + 1;
      const nextProblemId = problems[nextIndex].problemId;
      await setCurrentProblemById(nextProblemId);
    }
  };

  const handlePrev = async () => {
    const index = getProblemIndex();
    if (index <= 0) {
    } else {
      const prevIndex = index - 1;
      const prevProblemId = problems[prevIndex].problemId;
      await setCurrentProblemById(prevProblemId);
    }
  };

  const handleProblemInfoClick = async () => {
    if (currentProblemId != inProgProblem?.problemId) {
      alert(`[${inProgProblem?.name}]을 먼저 해결해야 도전할 수 있습니다!`);
      return;
    }
    navigate("/code");
  };

  const handleGiveUp = async () => {
    if (!confirm("정말로 로드맵을 포기하시겠습니까?")) return;
    await giveUp();
    navigate("/none");
  };

  const handleAddProblem = async () => {
    const response = await postRecommendProblem(roadmapId!);
    setCurrentProblemById(response.currentProblem.problemId);
    alert(`문제가 추가되었습니다`);
    fetchRoadmapData(() => {});
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <ProblemInfo
        title={currProblem?.name || "오류 발생"}
        description={currProblem?.description || "오류 발생"}
        onClick={handleProblemInfoClick}
      />
      <div className="flex items-end justify-center w-full gap-x-[116px] fixed bottom-12 ">
        <PrevBtn onClick={handlePrev} />
        <div className="flex items-center justify-center">
          <IconStar className="z-10 drop-shadow-[0_0_40px_#F2C53D]" />
          <span className="absolute font-bold text-4xl z-10">
            {getProblemIndex() + 1}
          </span>
          <div className="fixed bottom-20">
            <Character className="z-0 relative" />
            <div>
              <BubbleBtn
                text={`학습 로드맵 ${Math.floor(
                  (problems.findIndex(
                    (p) => p.problemId === inProgProblem?.problemId
                  ) /
                    problems.length) *
                    100
                )}% 달성 중`}
                position="right"
                style={{ "--tail-offset": "50px", "--tail-color": "#F8E19D" }}
                className="absolute w-[259px] h-[111px] bottom-[253px] left-[-236px]  bg-point-secondary"
              />
              <BubbleBtn
                text={`일일 학습 목표 달성까지\n${dailyRemainedCount}문제 남음`}
                position="right"
                style={{ "--tail-offset": "50px", "--tail-color": "#F8E19D" }}
                className="absolute w-[259px] h-[111px] bottom-[104px] left-[-301px] whitespace-pre-line bg-point-secondary"
              />
              <BubbleBtn
                text={"문제 추가하기"}
                onClick={handleAddProblem}
                position="left"
                style={{ "--tail-offset": "40px", "--tail-color": "#FBF0CE" }}
                className="absolute w-[192px] h-[82px] bottom-[188px] right-[-179px] bg-point-teritary hover:bg-point-secondary"
              />
              <BubbleBtn
                text={"로드맵 포기하기"}
                onClick={handleGiveUp}
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
