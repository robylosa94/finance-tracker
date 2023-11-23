"use client"

import Container from "../container"
import s from "./latest.module.css"
import ArrowLink from "../arrow-link"
import MovesCard from "./card"
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useEffect, useState } from "react"

export default function MovesLatest() {
  const [latestMoves, setLatestMoves] = useState<any[]>([])

  useEffect(() => {
    const getLatestMoves = async () => {
      const movesCollection = collection(db, "moves")
      const movesQuery = query(movesCollection, orderBy("createdAt", "desc"), limit(3))
      const querySnap = await getDocs(movesQuery)
      const data = querySnap.docs.map((doc) => {
        return doc.data()
      })

      setLatestMoves(data)
    }

    getLatestMoves()
  }, [])

  return (
    <article className={s.root}>
      <Container>
        <header className={s.header}>
          <h2 className={s.headerTitle}>Ultimi movimenti</h2>
          <ArrowLink href="#">Vedi tutti</ArrowLink>
        </header>
        <ul className={s.list}>
          {latestMoves.map((item, idx) => (
            <li key={idx} className={s.item}>
              <MovesCard data={item} />
            </li>
          ))}
        </ul>
      </Container>
    </article>
  )
}
