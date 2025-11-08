import FeaturedCard from "../FeaturedCard";
import ImgC from "@assets/image/logo_C.svg?react";
import ImgJava from "@assets/image/logo_Java.svg?react";
import ImgPython from "@assets/image/logo_Python.svg?react";

const LanguageCardStyle =
  "h-[364px] w-[367px] hover:scale-105 transition-transform duration-300 ease-out";
const CARD_PROPS = [
  {
    text: "C",
    img: <ImgC height={120} width={108} />,
  },
  {
    text: "JAVA",
    img: <ImgJava height={132} width={108} />,
  },
  {
    text: "Python",
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
        <button key={props.text} onClick={() => onClick?.(props.text)}>
          <FeaturedCard {...props} styles={LanguageCardStyle} />
        </button>
      ))}
    </div>
  );
}
