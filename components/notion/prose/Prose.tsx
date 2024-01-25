import { cn } from "@/lib/utils";
import "./prose.css"

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn(className, 'prose dark:prose-invert')} {...props} />
  )
}