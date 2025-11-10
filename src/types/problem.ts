export type LanguageType = "c" | "java" | "python";

export interface SolutionRequest {
  language: "c" | "java" | "python";
  sourceCode: string;
}

export interface SolutionResponse {
  allPassed: boolean;
  testcaseResults: TestCaseResult[];
}

export interface TestCaseResult {
  passed: boolean;
  message: null | string;
}
