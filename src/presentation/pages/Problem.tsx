import { useState } from "react";
import {
  ProblemBody,
  CodeEditor,
  ProblemFooter,
  ProblemHeader,
} from "../components";

interface ProblemProps {
  problemName: string;
  problemDescription: string;
  inputDescription: string;
  outputDescription: string;
  language: "python" | "java" | "cpp";
  onActionClick: (code: string) => void;
}

const Problem = (props: ProblemProps) => {
  const [code, setCode] = useState<string>("");
  return (
    <div className="flex flex-col min-h-screen w-full">
      <ProblemHeader problemTitle={props.problemName} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/5 overflow-auto">
          <ProblemBody
            problem_description={props.problemDescription}
            input_description={props.inputDescription}
            output_description={props.outputDescription}
          />
        </div>
        <div className="w-3/5 overflow-auto">
          <CodeEditor
            language={props.language}
            onChange={(newCode) => setCode(newCode)}
          />
        </div>
      </div>
      <ProblemFooter
        language={props.language}
        onActionClick={() => props.onActionClick(code)}
      />
    </div>
  );
};

export default Problem;
