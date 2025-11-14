interface ProblemBoxProps {
  problem_description: string;
  input_description: string;
  output_description: string;
}
const ProblemBody = (props: ProblemBoxProps) => {
  return (
    <section
      className="bg-main text-white 
    flex flex-col gap-y-12
    h-full w-full p-10"
    >
      <div className="flex flex-col gap-y-4">
        <h1 className="text-titleL">문제</h1>
        <article
          className="text-bodyL"
          dangerouslySetInnerHTML={{ __html: props.problem_description }}
        />
      </div>
      <hr />
      <div className="flex flex-col gap-y-4">
        <h1 className="text-titleL">입력</h1>
        <article
          className="text-bodyL"
          dangerouslySetInnerHTML={{ __html: props.input_description }}
        />
      </div>
      <hr />
      <div className="flex flex-col gap-y-4">
        <h1 className="text-titleL">입출력 예시</h1>
        <article
          className="text-bodyL"
          dangerouslySetInnerHTML={{ __html: props.output_description }}
        />
      </div>
    </section>
  );
};

export default ProblemBody;
