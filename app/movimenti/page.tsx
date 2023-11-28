"use client"

import Container from "../components/container"
import { Filters, List as MovesList } from "../components/moves"
import Title from "../components/title"
import { useFirebaseCollections } from "../components/firebase-context"
import { useEffect, useRef, useState } from "react"
import { MoveTypes } from "@/lib/types"
import { monthNames } from "@/lib/helpers"

export default function Movimenti() {
  const { moves, loadingData } = useFirebaseCollections()

  const formRef = useRef<HTMLFormElement>(null)

  const defaultSelectedFilters = {
    year: "",
    month: "",
  }

  const [selectedFilters, setSelectedFilters] = useState<{ year: string; month: string }>(defaultSelectedFilters)
  const [filteredMoves, setFilteredMoves] = useState<MoveTypes[]>(moves)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const yearSelected = (formRef.current?.querySelector("select[name=year]") as HTMLSelectElement).value
    const monthSelected = (formRef.current?.querySelector("select[name=month]") as HTMLSelectElement).value

    setSelectedFilters({ year: yearSelected, month: monthSelected })
  }

  useEffect(() => {
    const filtered = moves.filter((move) => {
      return (
        (selectedFilters.year.length > 0 ? move.createdAt.getFullYear().toString() === selectedFilters.year : true) &&
        (selectedFilters.month.length > 0 ? monthNames[move.createdAt.getMonth()] === selectedFilters.month : true)
      )
    })
    const sortFiltered = filtered.sort((a: any, b: any) => b.createdAt - a.createdAt)

    setFilteredMoves(sortFiltered)
  }, [moves, selectedFilters])

  return (
    <main>
      <section className="my-section-gap">
        <Container>
          <header className="mb-5">
            <Title Component="h1">Tutti i movimenti</Title>
          </header>
          <Filters selected={selectedFilters} formRef={formRef} submitHandler={submitHandler} />
          {loadingData ? <span>Loading...</span> : <MovesList moves={filteredMoves} />}
        </Container>
      </section>
    </main>
  )
}
