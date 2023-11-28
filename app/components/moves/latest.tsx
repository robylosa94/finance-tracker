"use client"

import Container from "../container"
import ArrowLink from "../arrow-link"
import { useEffect, useState } from "react"
import { movesUrl } from "@/lib/urls"
import Title from "../title"
import MovesList from "./list"
import { useFirebaseCollections } from "../firebase-context"

export default function MovesLatest() {
  const { moves } = useFirebaseCollections()

  const [latest, setLatest] = useState<any[]>([])

  useEffect(() => {
    const latestMoves = moves.sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 3)
    setLatest(latestMoves)
  }, [moves])

  return (
    <article className="my-section-gap">
      <Container>
        <header className="flex items-baseline justify-between mb-5">
          <Title>Ultimi movimenti</Title>
          {latest.length > 0 && <ArrowLink href={movesUrl()}>Vedi tutti</ArrowLink>}
        </header>
        <MovesList moves={latest} />
      </Container>
    </article>
  )
}
