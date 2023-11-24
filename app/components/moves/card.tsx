import { currencyFormatter } from "@/lib/helpers"
import { FiRefreshCcw } from "react-icons/fi"
import s from "./card.module.css"
import clsx from "clsx"
import { MoveTypes } from "@/lib/types"

interface Props {
  data: MoveTypes
}

export default function MovesCard({ data }: Props) {
  const { type, isRecurrent, tag, amount } = data

  const rootClassName = clsx(s.root, {
    [s.root_type_expense]: type === "uscita",
    [s.root_type_income]: type === "entrata",
  })

  return (
    <button className={rootClassName}>
      <span className={s.tag}>
        <span style={{ backgroundColor: tag.color }}></span>
        {tag.name}
      </span>
      <div className={s.amount}>
        {isRecurrent ? <FiRefreshCcw className={s.recurrentIcon} title="Uscita ricorrente" /> : ""}
        <span>{currencyFormatter(amount)}</span>
      </div>
    </button>
  )
}
