import Button from "../common/Button";

interface CodeFooterProps {
  nickname: string;
}
const OtherCodeHeader = (props: CodeFooterProps) => {
  return (
    <footer
      className="h-[72px] w-full bg-main border-b border-point px-10
    flex justify-between items-center"
    >
      <span className="text-white text-titleL">
        {`${props.nickname}님의 풀이`}
      </span>
    </footer>
  );
};

export default OtherCodeHeader;
