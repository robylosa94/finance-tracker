import { useEffect, useRef, useState } from "react"
import { monthNames } from "@/lib/helpers"
import { Filter } from "."
import s from "./filters.module.css"
import { useFirebaseCollections } from "../firebase-context"

interface Props {
  selected: {
    year: string
    month: string
  }
  formRef: any
  submitHandler: any
}

export default function MovesFilters({ selected, formRef, submitHandler }: Props) {
  const { moves } = useFirebaseCollections()

  const [yearFilter, setYearFilter] = useState<any[]>([])
  const [monthFilter, setMonthFilter] = useState<any[]>([])

  useEffect(() => {
    //Set filters
    //init
    let years: number[] = [],
      months: any[] = []

    //get
    moves.map((move, idx) => {
      years[idx] = move.createdAt.getFullYear()
      months[idx] = move.createdAt.getMonth()
    })

    //sort and remove duplicates
    const yearSet = new Set(years.sort((a: number, b: number) => a - b).map((year) => year.toString()))
    const monthSet = new Set(months.sort((a: number, b: number) => a - b).map((month) => monthNames[month]))

    //set
    setYearFilter(Array.from(yearSet))
    setMonthFilter(Array.from(monthSet))
  }, [moves])

  return (
    <div className={s.root}>
      <form className={s.form} onSubmit={submitHandler} ref={formRef}>
        <Filter filter={yearFilter} title="Anno" name="year" selected={selected.year} submitHandler={submitHandler} />
        <Filter
          filter={monthFilter}
          title="Mese"
          name="month"
          selected={selected.month}
          submitHandler={submitHandler}
        />
      </form>
    </div>
  )
}
