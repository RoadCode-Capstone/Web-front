import FeaturedCard from "../FeaturedCard";
import ImgC from "@assets/image/logo_C.svg?react";
import ImgJava from "@assets/image/logo_JAVA.svg?react";
import ImgPython from "@assets/image/logo_Python.svg?react";

const LanguageCardStyle =
  "h-[364px] w-[367px] hover:scale-105 transition-transform duration-300 ease-out";
const CARD_PROPS = [
  {
    text: "C",
    value: "c",
    img: <ImgC height={120} width={108} />,
  },
  {
    text: "JAVA",
    value: "java",
    img: <ImgJava height={132} width={108} />,
  },
  {
    text: "Python",
    value: "python",
    img: <ImgPython height={120} width={120} />,
  },
];

export function LanguageCards({
  onClick,
}: {
  onClick?: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-x-20">
      {CARD_PROPS.map((props) => (
        <button key={props.text} onClick={() => onClick?.(props.value)}>
          <FeaturedCard {...props} styles={LanguageCardStyle} />
        </button>
      ))}
    </div>
  );
}
