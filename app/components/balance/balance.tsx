import { IoMdAdd } from "react-icons/io"
import Button from "../button"
import Container from "../container"

import s from "./balance.module.css"
import { currencyFormatter } from "@/lib/utils"

export default function Balance() {
  return (
    <article className={s.root}>
      <Container>
        <h2 className={s.title}>Il mio saldo</h2>
        <strong className={s.amount}>{currencyFormatter(200000)}</strong>
        <div className={s.actions}>
          <Button Component="button">
            <IoMdAdd />
            Uscita
          </Button>
          <Button Component="button">
            <IoMdAdd />
            Entrata
          </Button>
        </div>
      </Container>
    </article>
  )
}
