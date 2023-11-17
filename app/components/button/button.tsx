import clsx from "clsx"
import { Route } from "next"
import Link from "next/link"
import { JSXElementConstructor, MouseEventHandler } from "react"
import s from "./button.module.css"

export interface Props {
  children: React.ReactNode
  className?: string | undefined
  Component?: string | JSXElementConstructor<any> | undefined
  href?: string | undefined
  isBlank?: boolean | undefined
  isDisabled?: boolean | undefined
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
  title?: string | undefined
  type?: "submit" | "reset" | "button" | undefined
  variant?: "danger" | "outlined" | undefined
}

export default function Button({
  children,
  className,
  Component = "a",
  href,
  isBlank,
  isDisabled,
  onClick,
  title,
  type,
  variant,
}: Props) {
  const rootClassName = clsx(
    s.root,
    { [s.variant_danger]: variant === "danger", [s.variant_outlined]: variant === "outlined" },
    className
  )

  return (
    <div className={rootClassName}>
      {Component === "a" && href ? (
        !isBlank ? (
          <Link href={href as Route} title={title} onClick={onClick}>
            {children}
          </Link>
        ) : (
          <a href={href} target="_blank" rel="noreferrer noopener" title={title}>
            {children}
          </a>
        )
      ) : (
        <Component onClick={onClick} type={type} disabled={isDisabled}>
          {children}
        </Component>
      )}
    </div>
  )
}
