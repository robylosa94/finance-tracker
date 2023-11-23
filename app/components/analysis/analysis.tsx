import { useEffect, useState } from "react"
import { Chart } from "."
import Container from "../container"
import s from "./analysis.module.css"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function Analysis() {
  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    const getExpenses = async () => {
      const movesCollection = collection(db, "moves")
      const movesQuery = query(movesCollection, where("type", "==", "expense"))
      const querySnap = await getDocs(movesQuery)
      const data = querySnap.docs.map((doc) => {
        return doc.data()
      })

      setExpenses(data)
    }

    getExpenses()
  }, [])

  return (
    <article className={s.root}>
      <Container>
        <header className={s.header}>
          <h2 className={s.headerTitle}>Analisi uscite</h2>
        </header>
        <Chart data={expenses} />
      </Container>
    </article>
  )
}
