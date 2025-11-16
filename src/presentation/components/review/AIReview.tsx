import IconUp from "@assets/icons/up.svg?react";
import IconDown from "@assets/icons/down.svg?react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AiReviewProps {
  content: string;
}
export function AiReview(props: AiReviewProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="bg-point border-1 border-black rounded-2xl py-2 px-4 w-full mb-4">
      <div className="w-full flex justify-between items-center px-2 py-4 border-b-1 border-black">
        <span className="font-medium text-[22px] text-black">AI 리뷰</span>
        {isExpanded ? (
          <IconUp width={24} height={12} onClick={() => setIsExpanded(false)} />
        ) : (
          <IconDown
            width={24}
            height={12}
            onClick={() => setIsExpanded(true)}
          />
        )}
      </div>

      {isExpanded && (
        <div
          className="prose max-w-none font-light text-base mt-4 bg-gray py-6 px-4
    rounded-2xl border-1 border-black"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
