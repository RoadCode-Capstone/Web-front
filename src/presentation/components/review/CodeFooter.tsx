import Button from "../common/Button";

interface CodeFooterProps {
  language: string;
}
const CodeFooter = (props: CodeFooterProps) => {
  return (
    <footer
      className="h-[72px] w-full bg-main border-t border-point px-10
    flex justify-between items-center"
    >
      <span className="text-point text-titleL">
        {`사용언어: ${props.language}`}
      </span>
    </footer>
  );
};

export default CodeFooter;
