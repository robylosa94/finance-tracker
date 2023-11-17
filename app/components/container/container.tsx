import clsx from "clsx"
import s from "./container.module.css"

interface Props {
  children: React.ReactNode
  className?: string | undefined
}

export default function Container({ children, className }: Props) {
  return <div className={clsx(s.root, className)}>{children}</div>
}
