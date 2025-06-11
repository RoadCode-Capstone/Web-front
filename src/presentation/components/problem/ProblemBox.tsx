interface ProblemDescription {
  description: string;
  input_description: string;
  output_description: string;
}
const ProblemBox: React.FC<ProblemDescription> = ({
  description,
  input_description,
  output_description,
}) => {
  return (
    <section>
      <h1>문제</h1>
      <article>{description}</article>

      <h1>입력</h1>
      <article></article> 

      <h1>입출력 예시</h1>
      <article></article>
    </section>
  );
};
