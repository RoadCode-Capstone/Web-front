interface submissionDetail {
  problemId: number;
  problemName: string;
  submissionId: number;
  isSuccess: boolean;
}

export interface submissionDto {
  date: string;
  submissionDetails: submissionDetail[];
}

export interface getSubmissionsDto {
  history: submissionDto[];
}
