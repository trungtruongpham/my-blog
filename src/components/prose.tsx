import { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return <div className="prose prose-lg max-w-none">{children}</div>;
}
