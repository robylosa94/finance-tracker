import clsx from "clsx"
import { Route } from "next"
import Link from "next/link"
import { JSXElementConstructor, MouseEventHandler } from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import s from "./arrow-link.module.css"

export interface Props {
  children: React.ReactNode
  className?: string | undefined
  Component?: string | JSXElementConstructor<any> | undefined
  href?: string | undefined
  isBlank?: boolean | undefined
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
  title?: string | undefined
}

export default function ArrowLink({ children, className, Component = "a", href, isBlank, onClick, title }: Props) {
  const rootClassName = clsx(s.root, className)

  return (
    <div className={rootClassName}>
      {Component === "a" && href ? (
        !isBlank ? (
          <Link href={href as Route} title={title} onClick={onClick}>
            {children}
            <FaArrowRightLong className="ml-2 w-3 h-3" />
          </Link>
        ) : (
          <a href={href} target="_blank" rel="noreferrer noopener" title={title}>
            {children}
            <FaArrowRightLong className="ml-2 w-3 h-3" />
          </a>
        )
      ) : (
        <Component onClick={onClick}>
          {children}
          <FaArrowRightLong className="ml-2 w-3 h-3" />
        </Component>
      )}
    </div>
  )
}
