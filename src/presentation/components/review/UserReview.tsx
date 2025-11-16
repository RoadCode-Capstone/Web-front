import IconUp from "@assets/icons/up.svg?react";
import IconDown from "@assets/icons/down.svg?react";
import { Fragment, useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import {
  commentDetail,
  getReviewsDto,
  reviewDto,
} from "@/apis/dto/submissionDto";
import { useReviewStore } from "@/stores/reviewStore";
import { WaitingModal } from "./Waiting";

export function UserReview() {
  const { submissionData, reviewsData, submitReview, isSubmittingComment } =
    useReviewStore();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [newReviewContent, setNewReviewContent] = useState("");

  return (
    <Fragment>
      {isSubmittingComment && <WaitingModal />}
      <div className="bg-point border-1 border-black rounded-2xl py-2 px-4 w-full">
        <div className="w-full flex justify-between items-center px-2 py-4 border-b-1 border-black">
          <span className="font-medium text-[22px] text-black">
            회원들이 남긴 리뷰
          </span>
          {isExpanded ? (
            <IconUp
              width={24}
              height={12}
              onClick={() => setIsExpanded(false)}
            />
          ) : (
            <IconDown
              width={24}
              height={12}
              onClick={() => setIsExpanded(true)}
            />
          )}
        </div>

        {isExpanded && (
          <div className="flex flex-col gap-y-4 mt-4">
            {!reviewsData ||
              (reviewsData.reviews.length === 0 && (
                <p className="text-center py-10">아직 등록된 리뷰가 없습니다</p>
              ))}
            {reviewsData?.reviews.map(
              (prop) =>
                prop.nickname !== "AI" && <UserReviewElement {...prop} />
            )}
            <div className="flex gap-x-2">
              <InputField
                placeholder="리뷰를 남겨보세요"
                id="comment"
                type="text"
                value={newReviewContent}
                onChange={(e) => setNewReviewContent(e.target.value)}
                style="h-[64px]"
              />
              <Button
                text="등록"
                onClick={() => {
                  if (submissionData?.id && newReviewContent) {
                    submitReview(submissionData.id, newReviewContent);
                    setNewReviewContent("");
                  }
                }}
                colorTheme={"point-secondary"}
                style={"font-light w-[94px] h-[64px]"}
              />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

function UserReviewElement(props: reviewDto) {
  const { submitComment } = useReviewStore();
  const [newCommentContent, setNewCommentContent] = useState("");

  return (
    <div
      className="flex flex-col font-light text-base gap-y-4 bg-gray py-6 px-4
    rounded-2xl border-1 border-black "
      key={props.reviewId}
    >
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between">
          <span className="font-bold">{props.nickname}</span>
          <span className="text-sm">{props.createdAt.split("T")[0]}</span>
        </div>
        <p>{props.content}</p>
      </div>
      <hr />
      <div>
        {props.comments &&
          props.nickname !== "AI" &&
          props.comments.map((v) => <UserComment {...v} />)}
        <div className="flex gap-x-2">
          <InputField
            placeholder="답글을 남겨보세요"
            id={`reply-${props.reviewId}`}
            type="text"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            style="h-[64px]"
          />
          <Button
            text="등록"
            onClick={() => {
              if (newCommentContent) {
                submitComment(props.reviewId, newCommentContent);
                setNewCommentContent("");
              }
            }}
            colorTheme={"point-secondary"}
            style={"font-light w-[94px] h-[64px]"}
          />
        </div>
      </div>
    </div>
  );
}

function UserComment(props: commentDetail) {
  return (
    <div className="flex flex-col gap-y-1" key={props.commentId}>
      <div className="flex justify-between">
        <span className="font-bold">{props.nickname}</span>
        <span className="text-sm">{props.createdAt.split("T")[0]}</span>
      </div>
      <p>{props.content}</p>
    </div>
  );
}
