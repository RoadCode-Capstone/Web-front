import { cn } from "@/utils/tailwind";

interface FeaturedCardProps {
  text: string;
  img?: React.ReactNode;
  styles: string;
}
function FeaturedCard(props: FeaturedCardProps) {
  return (
    <div
      className={cn(
        `bg-[#F9F9F9] flex flex-col items-center justify-center gap-y-14 
    rounded-2xl border-1 border-black
    font-medium text-[22px]`,
        props.styles
      )}
    >
      <span>{props.text}</span>
      {props?.img}
    </div>
  );
}
export default FeaturedCard;
