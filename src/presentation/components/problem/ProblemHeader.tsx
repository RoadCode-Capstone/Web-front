import Logo from "@assets/image/logo.svg?react";

interface ProblemHeaderProps {
  title: string;
}
const ProblemHeader = (props: ProblemHeaderProps) => {
  return (
    <header
      className="h-[72px] px-[72px]
      bg-main border-b-[2px] border-white
    flex items-center justify-between"
    >
      <h1 className="text-white font-medium text-2xl">{props.title}</h1>
      <Logo color="#F2C53D" />
    </header>
  );
};

export default ProblemHeader;
