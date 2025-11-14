export interface problemRes {
  problemId: number;
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
  tags: string[];
}

export interface problemsRes {
  problems: problemRes[];
}
