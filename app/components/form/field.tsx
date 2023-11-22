"use client"

import clsx from "clsx"
import { memo } from "react"
import { NumericFormat } from "react-number-format"
import s from "./field.module.css"

interface Props {
  children?: React.ReactNode
  className?: string | undefined
  disabled?: boolean | undefined
  maxLength?: number | undefined
  name: string
  nolabel?: boolean | undefined
  onChange?: any | undefined
  placeholder?: string | undefined
  required?: boolean | undefined
  size?: 50 | undefined
  text?: string | undefined
  title?: string | undefined
  type?:
    | "text"
    | "email"
    | "number"
    | "radio"
    | "checkbox"
    | "select"
    | "textarea"
    | "date"
    | "time"
    | "currency"
    | undefined
  value?: string | undefined
  lang?: string | undefined
}

function FormField({
  children,
  className,
  disabled,
  maxLength,
  name,
  nolabel,
  onChange,
  placeholder,
  required = false,
  size,
  text,
  title,
  type = "text",
  value,
  lang,
}: Props) {
  const rootClassName = clsx(s.root, { [s.root_50]: size === 50 }, className)

  return (
    <>
      <div className={rootClassName}>
        {!nolabel && (
          <label htmlFor={name} className={s.label}>
            {title}
            <span>{required && "*"}</span>
          </label>
        )}
        {type === "select" ? (
          <div className={s.selectWrapper}>
            <select
              id={name}
              name={name}
              autoComplete="off"
              required={required}
              defaultValue={value}
              disabled={disabled}
              onChange={onChange}
            >
              {children}
            </select>
          </div>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            autoComplete="off"
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
          ></textarea>
        ) : type === "checkbox" || type == "radio" ? (
          <label className={s.checkWrapper}>
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              autoComplete="off"
              required={required}
              disabled={disabled}
              onChange={onChange}
            />
            {text && <span dangerouslySetInnerHTML={{ __html: text }} />}
          </label>
        ) : type === "currency" ? (
          <NumericFormat
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            lang={lang}
            disabled={disabled}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            lang={lang}
            disabled={disabled}
            onChange={onChange}
          />
        )}
      </div>
    </>
  )
}

export default memo(FormField)
