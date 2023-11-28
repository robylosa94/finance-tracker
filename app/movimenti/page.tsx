"use client"

import Container from "../components/container"
import { Filters, List as MovesList } from "../components/moves"
import Title from "../components/title"
import { useFirebaseCollections } from "../components/firebase-context"
import { useEffect, useState } from "react"
import { MoveTypes } from "@/lib/types"

export default function Movimenti() {
  const { moves } = useFirebaseCollections()
  const [sorted, setSorted] = useState<MoveTypes[]>([])

  useEffect(() => {
    const sortedMoves = moves.sort((a: any, b: any) => b.createdAt - a.createdAt)
    setSorted(sortedMoves)
  }, [moves])

  return (
    <main>
      <section className="my-section-gap">
        <Container>
          <header className="mb-5">
            <Title Component="h1">Tutti i movimenti</Title>
          </header>
          <Filters />
          <MovesList moves={sorted} />
        </Container>
      </section>
    </main>
  )
}
