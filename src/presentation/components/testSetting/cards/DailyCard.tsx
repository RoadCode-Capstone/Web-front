import FeaturedCard from "../FeaturedCard";

const CARD_STYLE =
  "h-[140px] w-[140px] hover:scale-105 transition-transform duration-300 ease-out";
const CARD_PROPS = [
  {
    text: "1개",
    value: 1,
  },
  {
    text: "2개",
    value: 2,
  },
  {
    text: "3개",
    value: 3,
  },
];

export function DailyCard({ onClick }: { onClick?: (value: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-x-40">
      {CARD_PROPS.map((props) => (
        <button key={props.text} onClick={() => onClick?.(props.value)}>
          <FeaturedCard {...props} styles={CARD_STYLE} />
        </button>
      ))}
    </div>
  );
}
