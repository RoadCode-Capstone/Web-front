import FeaturedCard from "../FeaturedCard";

const CARD_STYLE =
  "h-[300px] w-[320px] hover:scale-105 transition-transform duration-300 ease-out";
const CARD_PROPS = [
  {
    text: "스택/큐",
  },
  {
    text: "DFS/BFS",
  },
  {
    text: "탐욕법",
  },
  {
    text: "트리",
  },
];

export function AlgorithmCards({
  onClick,
}: {
  onClick?: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-x-20">
      {CARD_PROPS.map((props) => (
        <button key={props.text} onClick={() => onClick?.(props.text)}>
          <FeaturedCard {...props} styles={CARD_STYLE} />
        </button>
      ))}
    </div>
  );
}
