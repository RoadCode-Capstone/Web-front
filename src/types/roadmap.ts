export interface RoadmapPostRequest {
  type: string;
  category: string;
  dailyGoal: number;
  levelTestResult: number;
}

export interface RoadmapsResponse {
  roadmapId: number;
  title: string;
  type: string;
  category: string;
  status: string;
}

export interface RoadmapResponse {
  roadmapId: number;
  title: string;
  type: string;
  category: string;
  currentProblem: RoadmapProblem;
}

export interface RoadmapProblem {
  roadmapProblemId: number;
  problemId: number;
  order: number;
  status: string;
}
