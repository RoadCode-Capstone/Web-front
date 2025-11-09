import WindowBox from "../common/WindowBox";

export function TestInfoBox({
  language,
  type,
  algorithm,
}: {
  language: string;
  type: string;
  algorithm?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <WindowBox
        style="flex w-[970px]! h-[496px]! "
        colorTheme={"point"}
        content={
          <div className="flex flex-col gap-y-12 items-center">
            <Heading />
            <InfoDetails
              language={language}
              type={type}
              algorithm={algorithm}
            />
          </div>
        }
      />
    </div>
  );
}

function Heading() {
  return <h1 className="font-bold text-[45px]">레벨테스트를 시작합니다!</h1>;
}

function InfoDetails({
  language,
  type,
  algorithm,
}: {
  language: string;
  type: string;
  algorithm?: string;
}) {
  return (
    <div className="px-10 py-8 bg-[#F9F9F9] rounded-2xl border-[0.5px] border-black pr-24">
      <ul className="list-disc font-light text-base mx-10 my-6">
        <li>제한 시간은 2시간이에요.</li>
        <li>사용 언어는 '{language}'에요.</li>
        <li>
          테스트 내용은 '
          {type === "algorithm" ? `${algorithm}` : `${language} 문법`}'(이)에요.
        </li>
        <li>제한 시간이 종료되거나, 종료 버튼을 누르면 종료돼요.</li>
      </ul>
    </div>
  );
}
