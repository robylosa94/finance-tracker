import { IoMdAdd } from "react-icons/io"
import Button from "../button"
import Container from "../container"

import s from "./balance.module.css"
import { currencyFormatter } from "@/lib/utils"
import { useToggleModalAddExpense, useToggleModalAddIncome } from "../context"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import clsx from "clsx"

export default function Balance() {
  const toggleModalAddExpense = useToggleModalAddExpense()
  const toggleModalAddIncome = useToggleModalAddIncome()

  const [movesBalance, setMovesBalance] = useState(0)

  useEffect(() => {
    const getMovesBalance = async () => {
      //Get moves amount
      const movesCollection = collection(db, "moves")
      const querySnap = await getDocs(movesCollection)
      const data = querySnap.docs.map((doc) => {
        if (doc.data()["type"] === "expense") {
          return -doc.data()["amount"]
        } else {
          return doc.data()["amount"]
        }
      })

      //Get moves balance
      let sum = 0
      for (let i = 0; i < data.length; i++) {
        sum += data[i]
      }

      setMovesBalance(sum)
    }

    getMovesBalance()
  }, [])

  return (
    <article className={s.root}>
      <Container>
        <h2 className={s.title}>Il mio saldo</h2>
        <strong className={clsx(s.amount, { [s.amount_negative]: movesBalance < 0 })}>
          {currencyFormatter(movesBalance)}
        </strong>
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
