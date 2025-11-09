import { LanguageType } from "@/types/problem";
import { ProblemBody, ProblemFooter, ProblemHeader } from "../components";
import CodeEditor from "../components/problem/CodeEditor";
import { Suggest } from "../components/problem/modals/Suggest";

interface ProblemPageProps {
  language: LanguageType;
}
export function ProblemPage(props: ProblemPageProps) {
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        {/* 상단 고정 헤더 */}
        <ProblemHeader title="문제 제목" />

        {/* 본문 영역 (남은 공간 모두 차지) */}
        <div className="flex flex-1 min-h-0 bg-[#282C34]">
          {/* 왼쪽: 문제 영역 */}
          <div className="basis-2/5 min-w-0 overflow-y-auto">
            <ProblemBody
              problem_description=""
              input_description=""
              output_description=""
            />
          </div>

          {/* 오른쪽: 코드 에디터 */}
          <div className="flex-1 min-w-0 overflow-y-auto">
            <CodeEditor language={props.language} />
          </div>
        </div>

        {/* 하단 고정 푸터 */}
        <ProblemFooter language={props.language} onClick={() => {}} />
      </div>
    </>
  );
}
