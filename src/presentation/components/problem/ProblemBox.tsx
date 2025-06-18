interface ProblemBoxProps {
  problem_description: string;
  input_description: string;
  output_description: string;
}
const ProblemBox = (props: ProblemBoxProps) => {
  return (
    <section
      className="bg-main text-white 
    flex flex-col gap-y-12
    h-full w-full p-10"
    >
      <div>
        <h1 className="text-titleL">문제</h1>
        <article className="text-bodyL">{props.problem_description}</article>
      </div>
      <hr />
      <div>
        <h1 className="text-titleL">입력</h1>
        <article className="text-bodyL">{props.input_description}</article>
      </div>
      <hr />
      <div>
        <h1 className="text-titleL">입출력 예시</h1>
        <article className="text-bodyL">{props.output_description}</article>
      </div>
    </section>
  );
};

export default ProblemBox;
