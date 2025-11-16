import { useEffect, useState } from "react";
import FeaturedCard from "../FeaturedCard";
import { getTags } from "@/apis/others";

const CARD_STYLE =
  "h-[120px] w-full hover:scale-105 transition-transform duration-300 ease-out";

export function AlgorithmCards({
  onClick,
}: {
  onClick?: (value: string) => void;
}) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const handleTags = async () => {
      const tags = await getTags();
      setTags(tags.tags);
    };
    handleTags();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-5">
      {tags.map((tag) => (
        <button key={tag} onClick={() => onClick?.(tag)}>
          <FeaturedCard text={tag} styles={CARD_STYLE} />
        </button>
      ))}
    </div>
  );
}
