export interface LeveltestRequest {
  type: string;
  category?: string;
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
