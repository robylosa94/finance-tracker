import { useEffect, useState } from "react"
import { monthNames } from "@/lib/helpers"
import { Filter } from "."
import s from "./filters.module.css"
import { useFirebaseCollections } from "../firebase-context"

export default function MovesFilters() {
  const { moves } = useFirebaseCollections()

  const [monthFilter, setMonthFilter] = useState<any[]>([])
  const [yearFilter, setYearFilter] = useState<any[]>([])
  const [typeFilter, setTypeFilter] = useState<any[]>([])
  const [tagFilter, setTagFilter] = useState<any[]>([])

  useEffect(() => {
    //Set filters
    //init
    let months: any[] = [],
      years: number[] = [],
      types: string[] = [],
      tags: string[] = []

    //get
    moves.map((move, idx) => {
      months[idx] = move.createdAt.getMonth()
      years[idx] = move.createdAt.getFullYear()
      types[idx] = move.type
      tags[idx] = move.tag.name
    })

    //sort and remove duplicates
    const monthSet = new Set(months.sort((a: number, b: number) => a - b).map((month) => monthNames[month]))
    const yearSet = new Set(years.sort((a: number, b: number) => a - b))
    const typeSet = new Set(types.sort())
    const tagSet = new Set(tags.sort())

    //set
    setMonthFilter(Array.from(monthSet))
    setYearFilter(Array.from(yearSet))
    setTypeFilter(Array.from(typeSet))
    setTagFilter(Array.from(tagSet))
  }, [moves])

  return (
    <div className={s.root}>
      <form className={s.form}>
        <Filter filter={yearFilter} title="Anno" />
        <Filter filter={monthFilter} title="Mese" />
        <Filter filter={typeFilter} title="Tipologia" />
        <Filter filter={tagFilter} title="Tag" />
        <button type="submit">Invia</button>
      </form>
    </div>
  )
}
