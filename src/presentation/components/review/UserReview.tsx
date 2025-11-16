import IconUp from "@assets/icons/up.svg?react";
import IconDown from "@assets/icons/down.svg?react";
import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import {
  commentDetail,
  getReviewsDto,
  reviewDto,
} from "@/apis/dto/submissionDto";

export function UserReview(props: getReviewsDto) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="bg-point border-1 border-black rounded-2xl py-2 px-4 w-full">
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
        <div className="flex flex-col gap-y-4 mt-4">
          {props.reviews.length === 0 && (
            <p className="text-center py-10">아직 등록된 리뷰가 없습니다</p>
          )}
          {props.reviews.map((prop) => (
            <UserReviewElement {...prop} />
          ))}
          <div className="flex gap-x-2">
            <InputField
              placeholder="리뷰를 남겨보세요"
              id="comment"
              type="text"
              onChange={(e) => {}}
              style="h-[64px]"
            />
            <Button
              text="등록"
              onClick={() => {}}
              colorTheme={"point-secondary"}
              style={"font-light w-[94px] h-[64px]"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function UserReviewElement(props: reviewDto) {
  const [newReview, setNewReview] = useState<string>();

  return (
    <div
      className="flex flex-col font-light text-base gap-y-4 bg-gray py-6 px-4
    rounded-2xl border-1 border-black "
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
            id="comment"
            type="text"
            onChange={(e) => setNewReview(e.target.value)}
            style="h-[64px]"
            key={props.reviewId}
          />
          <Button
            key={props.reviewId}
            text="등록"
            onClick={() => {}}
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
    <div className="flex flex-col gap-y-1">
      <div className="flex justify-between">
        <span className="font-bold">{props.nickname}</span>
        <span className="text-sm">{props.createdAt.split("T")[0]}</span>
      </div>
      <p>{props.content}</p>
    </div>
  );
}
