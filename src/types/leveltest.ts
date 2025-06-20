export interface LeveltestRequest {
  type: string;
  category?: string;
}

export interface LevelTestSubmission {
  problemId: number;
  language: string;
  sourceCode: string;
}

export interface LevelTestSubmissionsRequest {
  submissions: LevelTestSubmission[];
}

export interface LevelTestSubmissionsResponse {
  totalProblems: number;
  result: boolean[];
  passedCount: number;
}

export interface ProblemResponse {
  id: number;
  contestId: number;
  index: string;
  name: string;
  rating: number;
  description: string;
  inputDescription: string;
  outputDescription: string;
  timeLimit: string;
  memoryLimit: string;
  url: string;
  tags: Array<string>;
}
