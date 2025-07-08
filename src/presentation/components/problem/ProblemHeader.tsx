interface ProblemHeaderProps {
  problemTitle: string;
}
const ProblemHeader = (props: ProblemHeaderProps) => {
  return (
    <header
      className="h-[72px] w-full px-[72px]
      bg-main border-b-[2px] border-white
    flex items-center"
    >
      <h1 className="text-white text-headlineS">{props.problemTitle}</h1>
    </header>
  );
};

export default ProblemHeader;
