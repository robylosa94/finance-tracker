"use client"

import clsx from "clsx"
import { memo } from "react"
import { NumericFormat } from "react-number-format"
import s from "./field.module.css"
import { IoIosArrowDown } from "react-icons/io"

interface Props {
  autoFocus?: boolean | undefined
  children?: React.ReactNode
  className?: string | undefined
  disabled?: boolean | undefined
  innerRef?: any | undefined
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
    | "color"
    | "currency"
    | undefined
  value?: string | undefined
  lang?: string | undefined
}

function FormField({
  autoFocus,
  children,
  className,
  disabled,
  innerRef,
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
              autoFocus={autoFocus}
              autoComplete="off"
              required={required}
              defaultValue={value}
              disabled={disabled}
              onChange={onChange}
              ref={innerRef}
            >
              {children}
            </select>
            <IoIosArrowDown />
          </div>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            autoFocus={autoFocus}
            autoComplete="off"
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            ref={innerRef}
          ></textarea>
        ) : type === "checkbox" || type == "radio" ? (
          <label className={s.checkWrapper}>
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              autoFocus={autoFocus}
              autoComplete="off"
              required={required}
              disabled={disabled}
              onChange={onChange}
              ref={innerRef}
            />
            {text && <span dangerouslySetInnerHTML={{ __html: text }} />}
          </label>
        ) : type === "currency" ? (
          <NumericFormat
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            id={name}
            name={name}
            autoFocus={autoFocus}
            autoComplete="off"
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            lang={lang}
            disabled={disabled}
            onChange={onChange}
            getInputRef={innerRef}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            autoFocus={autoFocus}
            autoComplete="off"
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            lang={lang}
            disabled={disabled}
            onChange={onChange}
            ref={innerRef}
          />
        )}
      </div>
    </>
  )
}

export default memo(FormField)
