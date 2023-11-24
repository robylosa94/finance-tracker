"use client"

import { useEffect, useState } from "react"
import Container from "../components/container"
import { Filters, List as MovesList } from "../components/moves"
import Title from "../components/title"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function Movimenti() {
  const [moves, setMoves] = useState<any[]>([])

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newMoves = moves.filter((move) => move.amount === 50)
    setMoves(newMoves)
    console.log(moves)
  }

  useEffect(() => {
    const getMoves = async () => {
      const movesCollection = collection(db, "moves")
      const movesQuery = query(movesCollection, orderBy("createdAt", "desc"))
      const querySnap = await getDocs(movesQuery)
      const data = querySnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        }
      })

      setMoves(data)
    }

    getMoves()
  }, [])

  return (
    <main>
      <section className="my-section-gap">
        <Container>
          <header className="mb-5">
            <Title Component="h1">Tutti i movimenti</Title>
          </header>
          <Filters moves={moves} submitHandler={submitHandler} />
          <MovesList moves={moves} />
        </Container>
      </section>
    </main>
  )
}
