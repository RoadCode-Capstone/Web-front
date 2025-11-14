import IconUp from "@assets/icons/up.svg?react";
import IconDown from "@assets/icons/down.svg?react";
import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface UserReviewProps {
  nickname: string;
  content: string;
}

export function UserReview(props: UserReviewProps[]) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div>
      <div className="w-full flex justify-between items-center px-2 py-4 border-b-1 border-black">
        <span className="font-medium text-[22px] text-black">
          회원들이 남긴 리뷰
        </span>
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
        <div>
          {props.map((prop) => (
            <UserReviewElement {...prop} />
          ))}
        </div>
      )}
    </div>
  );
}

interface UserReviewElementProps {
  nickname: string;
  content: string;
}

function UserReviewElement(props: UserReviewElementProps) {
  return (
    <div className="flex flex-col font-light text-base gap-y-4">
      <div>
        <p className="font-bold">{props.nickname}</p>
        <p>{props.content}</p>
      </div>
      <hr />
      <div>
        <InputField placeholder="답글을 남겨보세요" id="comment" type="text" />
        <Button
          text="등록"
          onClick={() => {}}
          colorTheme={"point-secondary"}
          style={"font-light"}
        />
      </div>
    </div>
  );
}
