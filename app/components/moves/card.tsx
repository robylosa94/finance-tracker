import { currencyFormatter } from "@/lib/utils"
import { FiRefreshCcw } from "react-icons/fi"
import s from "./card.module.css"
import clsx from "clsx"

interface Props {
  data: {
    type: string
    isRecurrent: boolean
    tag: {
      color: string
      name: string
    }
    amount: number
  }
}

export default function MovesCard({ data }: Props) {
  const { type, isRecurrent, tag, amount } = data

  const rootClassName = clsx(s.root, {
    [s.root_type_out]: type === "out",
    [s.root_type_in]: type === "in",
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
