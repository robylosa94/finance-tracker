import clsx from "clsx"
import { JSXElementConstructor } from "react"
import s from "./title.module.css"

interface Props {
  children?: React.ReactNode
  className?: string
  Component?: string | JSXElementConstructor<any>
  innerHtml?: any
}

export default function Title({ children, className, Component = "h2", innerHtml }: Props) {
  const rootClassName = clsx(s.root, className)

  return (
    <>
      {innerHtml ? (
        <Component className={rootClassName} dangerouslySetInnerHTML={{ __html: innerHtml }} />
      ) : (
        <Component className={rootClassName}>{children}</Component>
      )}
    </>
  )
}
