import Button from "../common/Button";

interface ProblemFooterProps {
  language: string;
  onActionClick: () => void;
}
const ProblemFooter = (props: ProblemFooterProps) => {
  return (
    <footer
      className="h-[72px] w-full bg-main border-t border-point px-10
    flex justify-between items-center"
    >
      <span className="text-point text-titleL">
        {`사용언어: ${props.language}`}
      </span>
      <Button
        type="submit"
        buttonStyle="w-40 h-14 bg-point !text-black"
        label="제출하기"
        onClick={props.onActionClick}
      ></Button>
    </footer>
  );
};

export default ProblemFooter;
