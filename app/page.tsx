"use client"

import dynamic from "next/dynamic"
import Analysis from "./components/analysis/analysis"
import Balance from "./components/balance"
import { useSiteContext } from "./components/context"
import { Latest as LatestMoves } from "./components/moves"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

const ModalAddExpense = dynamic(() => import("./components/moves/modal-add"), { ssr: false })
const ModalAddIncome = dynamic(() => import("./components/moves/modal-add"), { ssr: false })

export default function Home() {
  const { isModalAddExpenseOpen, isModalAddIncomeOpen } = useSiteContext()
  const [moves, setMoves] = useState<any[]>([])

  useEffect(() => {
    const getMoves = async () => {
      const movesCollection = collection(db, "moves")
      const querySnap = await getDocs(movesCollection)
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
      <Balance moves={moves} />
      <LatestMoves moves={moves} />
      <Analysis moves={moves} />
      {isModalAddExpenseOpen && <ModalAddExpense type="uscita" />}
      {isModalAddIncomeOpen && <ModalAddIncome type="entrata" />}
    </main>
  )
}
