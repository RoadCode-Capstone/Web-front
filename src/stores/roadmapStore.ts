// src/stores/roadmapStore.ts (새 파일)
import { create } from "zustand";
import {
  getInProgRoadmaps,
  getRoadmap,
  getRoadmapProblems,
  giveUpRoadmap,
} from "@/apis/roadMap";
import { getProblem } from "@/apis/problem";
import { RoadmapProblem } from "@/types/roadmap";
import { LanguageType } from "@/types/problem";
import { problemRes } from "@/apis/dto/problemDto";
import { addAttendance } from "@/apis/point";

interface RoadmapState {
  isLoading: boolean;
  roadmapId?: number;
  problems: RoadmapProblem[];
  currentProblemId?: number;
  currProblem?: problemRes;
  inProgProblem?: problemRes;
  language: LanguageType;
  dailyGoal: number;
  dailyRemainedCount: number | null;
  error: string | null;

  fetchRoadmapData: (onFailure: () => void) => Promise<void>;
  setCurrentProblemById: (problemId: number) => Promise<void>;
  giveUp: () => Promise<void>;
  setDailyRemainedCount: (count: number) => void;
  getProblemIndex: () => number;
  getCurrentProblemDetail: () => RoadmapProblem | undefined;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  // 초기 상태
  isLoading: true,
  problems: [],
  language: "c",
  dailyGoal: 0,
  dailyRemainedCount: null,
  error: null,

  // 액션 (상태를 변경하는 함수)
  fetchRoadmapData: async (onFailure) => {
    set({ isLoading: true, error: null });
    try {
      await addAttendance();
      const inProgRoadmap = await getInProgRoadmaps();

      if (!inProgRoadmap || inProgRoadmap.status !== "IN_PROGRESS") {
        onFailure();
        return;
      }

      const { roadmapId, language } = inProgRoadmap;
      set({ roadmapId, language: language.toLowerCase() as LanguageType });

      const [roadmap, problemsResponse] = await Promise.all([
        getRoadmap(roadmapId),
        getRoadmapProblems(roadmapId),
      ]);

      const allProblems = problemsResponse.roadmapProblems;
      const currentId = roadmap.currentProblem.problemId;
      const problemResponse = await getProblem(currentId);

      set({
        problems: allProblems,
        currentProblemId: currentId,
        currProblem: problemResponse,
        inProgProblem: problemResponse,
        dailyGoal: roadmap.dailyGoal,
      });

      set((state) => ({
        dailyRemainedCount: state.dailyRemainedCount ?? roadmap.dailyGoal,
      }));
    } catch (error) {
      console.error("로드맵 정보를 불러오는 데 실패했습니다.", error);
      set({ error: "로드맵 정보를 불러오는 데 실패했습니다." });
      onFailure();
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentProblemById: async (problemId) => {
    set({ isLoading: true });
    try {
      const problemResponse = await getProblem(problemId);
      set({ currentProblemId: problemId, currProblem: problemResponse });
    } catch (error) {
      console.error("문제 정보를 불러오는 데 실패했습니다.", error);
    } finally {
      set({ isLoading: false });
    }
  },

  giveUp: async () => {
    const { roadmapId } = get();
    if (roadmapId) {
      await giveUpRoadmap(roadmapId);
    }
  },

  setDailyRemainedCount: (count) => {
    set({ dailyRemainedCount: count });
  },

  getProblemIndex: () => {
    const { problems, currentProblemId } = get();
    if (!currentProblemId) return -1;
    return problems.findIndex((p) => p.problemId === currentProblemId);
  },

  getCurrentProblemDetail: () => {
    const { problems, currentProblemId } = get();
    return problems.find((p) => p.problemId === currentProblemId);
  },
}));
