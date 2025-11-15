import { problemRes } from "@/apis/dto/problemDto";
import IconDown from "@assets/icons/down.svg?react";
import { useState } from "react";

const MyCodeHeader = (props: problemRes) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <>
      <header
        className="h-[72px] w-full bg-main border-b border-point px-10
    flex flex-col justify-center items-center"
      >
        <div className="flex w-full justify-between">
          <span className="text-white text-titleL">{props.name}</span>
          <IconDown
            width={24}
            height={12}
            color="#F2C53D"
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </header>
      {isExpanded && (
        <p className="text-white font-light text-sm px-10 py-2">
          {"props.description"}
        </p>
      )}
    </>
  );
};

export default MyCodeHeader;
