import Logo from "@assets/image/logo.svg?react";
import { useNavigate } from "react-router-dom";

interface ProblemHeaderProps {
  title: string;
}
const ProblemHeader = (props: ProblemHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header
      className="h-[72px] pr-[72px] pl-10
      bg-main border-b-[2px] border-white
    flex items-center justify-between"
    >
      <h1 className="text-white font-medium text-2xl">{props.title}</h1>
      <button>
        <Logo color="#F2C53D" onClick={() => navigate("/")} />
      </button>
    </header>
  );
};

export default ProblemHeader;
