import { LanguageType } from "./problem";

export interface RoadmapPostRequest {
  type: string;
  language: LanguageType;
  algorithm?: string;
  dailyGoal: number;
  levelTestResult: number;
}

export interface RoadmapsResponse {
  roadmapId: number;
  title: string;
  type: string;
  language: string;
  status: string;
}

export interface RoadmapResponse {
  roadmapId: number;
  title: string;
  type: string;
  language: string;
  algorithm: string | null;
  currentProblem: RoadmapProblem;
  levelTestResult: string;
  dailyGoal: number;
}

export interface RoadmapProblem {
  roadmapProblemId: number;
  problemId: number;
  order: number;
  status: string;
}

export interface RoadmapProblemsDto {
  roadmapProblems: RoadmapProblem[];
}

export interface MyRoadMapResDto {
  roadmaps: RoadMapDetailDto[];
}

export interface RoadMapDetailDto {
  roadmapId: number;
  title: string;
  type: string;
  language: string;
  algorithm: string;
  status: string;
}
