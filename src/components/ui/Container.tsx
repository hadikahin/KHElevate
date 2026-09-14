import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Comp className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-10", className)}>
      {children}
    </Comp>
  );
}
