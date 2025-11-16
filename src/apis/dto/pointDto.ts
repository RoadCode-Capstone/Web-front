export type PointType =
  | "ATTENDANCE"
  | "PROBLEM_SOLVED"
  | "DAILY_GOAL_COMPLETED"
  | "REVIEW"
  | "ROADMAP_COMPLETED";

export interface pointDetailDto {
  type: PointType;
  point: number;
}

export interface getPointHistoryDto {
  date: string;
  totalPoint: number;
  pointDetails: pointDetailDto[];
}

export interface getMyPointDto {
  totalPoint: number;
  history: getPointHistoryDto[];
}

export interface getTypeHistoryDto {
  type: PointType;
  totalPoint: number;
  point: number;
  dates: string[];
}

export interface getMyPointByTypeDto {
  totalPoint: number;
  history: getTypeHistoryDto[];
}

export interface rankingDetailDto {
  memberId: number;
  nickname: string;
  totalPoint: number;
  rank: number;
}

export interface getRankingDto {
  myRank: number;
  ranks: rankingDetailDto[];
}
