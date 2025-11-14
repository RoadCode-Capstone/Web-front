import BubbleImg from "@assets/image/bubble.svg?react";
import Button from "../common/Button";

interface ProblemInfoProps {
  title: string;
  description: string;
  onClick: () => void;
}
export function ProblemInfo(props: ProblemInfoProps) {
  return (
    <div className="flex items-center justify-center min-w-screen w-screen">
      <BubbleImg className="absolute w-full h-auto -z-10 top-0" />
      <div className="flex flex-col justify-start gap-y-4 pt-10 w-[860px]">
        <h1 className="font-medium text-[28px]">{props.title}</h1>
        <p
          className="font-light text-2xl line-clamp-5"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></p>
        <div className="flex justify-end">
          <Button
            text={"학습 시작하기"}
            onClick={props.onClick}
            colorTheme={"main-primary"}
            style="w-[400px] h-[72px]"
          />
        </div>
      </div>
    </div>
  );
}
