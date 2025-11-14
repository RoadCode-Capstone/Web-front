export type LanguageType = "c" | "java" | "python";

export interface SolutionRequest {
  language: "c" | "java" | "python";
  sourceCode: string;
  roadmapId: number;
  roadmapProblemId: number;
}

export interface SolutionResponse {
  allPassed: boolean;
  testcaseResults: TestCaseResult[];
  dailyGoal: number;
  dailyCompleted: number;
  dailyAchievementRate: number;
}

export interface TestCaseResult {
  passed: boolean;
  message: null | string;
}
