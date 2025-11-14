import CodeEditor from "../components/problem/CodeEditor";
export default function ReviewPage() {
  return (
    <div className="basis-2/5 min-w-0 overflow-y-auto">
      {/* 오른쪽: 코드 에디터 */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <CodeEditor
          language={language}
          initialCode={code}
          onChange={(newCode) => setCode(newCode)}
        />
      </div>
    </div>
  );
}
