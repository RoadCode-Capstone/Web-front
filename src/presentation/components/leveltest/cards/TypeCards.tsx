import FeaturedCard from "../FeaturedCard";
import ImgLanguage from "@assets/image/study_type_language.svg?react";
import ImgAlgorithm from "@assets/image/study_type_algorithm.svg?react";

const TypeCardStyle =
  "h-[364px] w-[367px] hover:scale-105 transition-transform duration-300 ease-out";
const CARD_PROPS = [
  {
    text: "프로그래밍 언어",
    img: <ImgLanguage height={108} width={108} />,
  },
  {
    text: "알고리즘",
    img: <ImgAlgorithm height={120} width={120} />,
  },
];

export function TypeCards({ onClick }: { onClick?: (value: string) => void }) {
  return (
    <div className="flex items-center justify-center gap-x-20">
      {CARD_PROPS.map((props) => (
        <button key={props.text} onClick={() => onClick?.(props.text)}>
          <FeaturedCard {...props} styles={TypeCardStyle} />
        </button>
      ))}
    </div>
  );
}
