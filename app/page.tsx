"use client"

import dynamic from "next/dynamic"
import Analysis from "./components/analysis/analysis"
import Balance from "./components/balance"
import { useSiteContext } from "./components/context"
import { Latest as LatestMoves } from "./components/moves"

const ModalAddExpense = dynamic(() => import("./components/moves/modal-add"), { ssr: false })
const ModalAddIncome = dynamic(() => import("./components/moves/modal-add"), { ssr: false })

export default function Home() {
  const { isModalAddExpenseOpen, isModalAddIncomeOpen } = useSiteContext()

  return (
    <main>
      <Balance />
      <LatestMoves />
      <Analysis />
      {isModalAddExpenseOpen && <ModalAddExpense type="expense" />}
      {isModalAddIncomeOpen && <ModalAddIncome type="income" />}
    </main>
  )
}
