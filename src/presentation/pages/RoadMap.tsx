import NextBtn from "../components/roadMap/NextBtn";
import PrevBtn from "../components/roadMap/PrevBtn";
import IconStar from "@assets/icons/star.svg?react";
import Character from "@assets/character/twinkle.svg?react";
import { ProblemInfo } from "../components/roadMap/ProblemInfo";
import BubbleBtn from "../components/common/CartoonButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getInProgRoadmaps,
  getRoadmap,
  getRoadmapProblems,
  giveUpRoadmap,
} from "@/apis/roadMap";
import { RoadmapProblem } from "@/types/roadmap";
import { getProblem, getProblems } from "@/apis/problem";
import { problemRes } from "@/apis/dto/problemDto";
import { LanguageType } from "@/types/problem";
import { Spinner } from "../components/common/spinner";
import { addAttendance } from "@/apis/point";

export default function RoadMap() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [inprogOrder, setInprogOrder] = useState<number>(0);
  const [inProgProblem, setInProgProblem] = useState<problemRes>();
  const [roadmapId, setRoadmapId] = useState<number>();
  const [currentProblemId, setCurrentProblemId] = useState<number>(0);
  const [problems, setProblems] = useState<RoadmapProblem[]>([]);
  const [currProblem, setCurrProblem] = useState<problemRes>();
  const [language, setLanguage] = useState<LanguageType>("c");
  const [dailyGoal, setDailyGoal] = useState<number>(0);

  useEffect(() => {
    const handleRoadmap = async () => {
      try {
        const attendance = await addAttendance();
        // 1. 로드맵 진행 상태 및 문제 목록 가져오기
        const inProgRoadmap = await getInProgRoadmaps();

        if (!inProgRoadmap || inProgRoadmap.status != "IN_PROGRESS") {
          navigate("/none");
          return;
        }
        setRoadmapId(inProgRoadmap.roadmapId);
        setLanguage(inProgRoadmap.language.toLowerCase() as LanguageType);

        const roadmap = await getRoadmap(inProgRoadmap.roadmapId);
        const problemsResponse = await getRoadmapProblems(
          inProgRoadmap.roadmapId
        );
        const allProblems = problemsResponse.roadmapProblems;
        const currentId = roadmap.currentProblem.problemId;

        // 2. 현재 순서에 맞는 문제 ID로 문제 정보 가져오기
        const problemResponse = await getProblem(currentId);

        // 3. 모든 상태 한 번에 업데이트
        setProblems(allProblems);
        setCurrentProblemId(currentId);
        setCurrProblem(problemResponse);

        setInprogOrder(allProblems.findIndex((p) => p.problemId === currentId));
        setInProgProblem(problemResponse);
      } catch (error) {
        // console.error("로드맵 정보를 불러오는 데 실패했습니다.", error);
        // alert("로드맵 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    handleRoadmap();
  }, []);

  const handleNext = async () => {
    const index = getProblemIndex();
    if (index >= problems.length - 1) {
    } else {
      const nextIndex = index + 1;
      const nextProblemId = problems[nextIndex].problemId;
      setCurrentProblemId(() => nextProblemId);
      const problemResponse = await getProblem(nextProblemId);
      setCurrProblem(problemResponse);
    }
  };

  const handlePrev = async () => {
    const index = getProblemIndex();
    if (index <= 0) {
    } else {
      const prevIndex = index - 1;
      const prevProblemId = problems[prevIndex].problemId;
      setCurrentProblemId(() => prevProblemId);
      const problemResponse = await getProblem(prevProblemId);
      setCurrProblem(problemResponse);
    }
  };

  const handleProblemInfoClick = async () => {
    if (currentProblemId != inProgProblem?.problemId) {
      alert(`[${inProgProblem?.name}]을 먼저 해결해야 도전할 수 있습니다!`);
      return;
    }
    navigate("/code", {
      state: {
        title: currProblem?.name || "오류 발생",
        description: currProblem?.description || "오류 발생",
        inputDescription: currProblem?.inputDescription || "오류 발생",
        outputDescription: currProblem?.outputDescription || "오류 발생",
        language,
        roadmapId,
        roadmapProblemId: getProblemDetail().roadmapProblemId,
        problemId: currProblem?.problemId || 0,
      },
    });
  };

  const getProblemIndex = () => {
    return problems.findIndex((p) => p.problemId === currentProblemId);
  };

  const getProblemDetail = () => {
    const detail = problems.find((p) => p.problemId === currentProblemId);
    if (!detail) throw new Error();
    return detail;
  };

  const handleGiveUp = async () => {
    await giveUpRoadmap(roadmapId!);
    navigate("/none");
  };

  if (isLoading) {
    return <Spinner />;
  }

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
                  (inprogOrder / problems.length) * 100
                )}% 달성 중`}
                position="right"
                style={{ "--tail-offset": "50px", "--tail-color": "#F8E19D" }}
                className="absolute w-[259px] h-[111px] bottom-[253px] left-[-236px]  bg-point-secondary"
              />
              <BubbleBtn
                text={"일일 학습 목표 달성까지\n0문제 남음"}
                position="right"
                style={{ "--tail-offset": "50px", "--tail-color": "#F8E19D" }}
                className="absolute w-[259px] h-[111px] bottom-[104px] left-[-301px] whitespace-pre-line bg-point-secondary"
              />
              <BubbleBtn
                text={"문제 추가하기"}
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
