import { LanguageType } from "@/types/problem";

export interface postLeveltestReq {
  type: string;
  language: LanguageType;
  algorithm?: string;
}

export interface postLeveltestRes {
  problemIds: number[];
}

export interface postSubmissionReq {
  submissions: submission[];
}

export interface submission {
  problemId: number;
  language: LanguageType;
  sourceCode: string;
}

export interface postSubmissionRes {
  totalProblems: number;
  result: boolean[];
  passedCount: number;
}
