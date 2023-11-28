import { IoMdAdd } from "react-icons/io"
import Button from "../button"
import Container from "../container"

import s from "./balance.module.css"
import { currencyFormatter } from "@/lib/helpers"
import { useToggleModalAddExpense, useToggleModalAddIncome } from "../context"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useFirebaseCollections } from "../firebase-context"

export default function Balance() {
  const { moves } = useFirebaseCollections()

  const toggleModalAddExpense = useToggleModalAddExpense()
  const toggleModalAddIncome = useToggleModalAddIncome()

  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const amounts = moves.map((move) => (move.type === "uscita" ? -move.amount : move.amount))

    const getBalance = () => {
      let sum = 0
      for (let i = 0; i < amounts.length; i++) {
        sum += amounts[i]
      }
      setBalance(sum)
    }

    getBalance()
  }, [moves])

  return (
    <article className={s.root}>
      <Container>
        <h2 className={s.title}>Il mio saldo</h2>
        <strong className={clsx(s.amount, { [s.amount_negative]: balance < 0 })}>{currencyFormatter(balance)}</strong>
        <div className={s.actions}>
          <Button Component="button" onClick={toggleModalAddExpense}>
            <IoMdAdd />
            Uscita
          </Button>
          <Button Component="button" onClick={toggleModalAddIncome}>
            <IoMdAdd />
            Entrata
          </Button>
        </div>
      </Container>
    </article>
  )
}
