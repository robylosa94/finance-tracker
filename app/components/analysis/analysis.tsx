import { Chart } from "."
import Container from "../container"
import s from "./analysis.module.css"

const data = [
  {
    type: "expense",
    isRecurrent: false,
    tag: {
      color: "#0000ff",
      name: "Prelievo",
    },
    amount: 100,
  },
  {
    type: "expense",
    isRecurrent: true,
    tag: {
      color: "#ff0000",
      name: "Benzina",
    },
    amount: 50,
  },
  {
    type: "expense",
    isRecurrent: false,
    tag: {
      color: "#0000ff",
      name: "Prelievo",
    },
    amount: 300,
  },
  {
    type: "expense",
    isRecurrent: true,
    tag: {
      color: "#ff0000",
      name: "Benzina",
    },
    amount: 50,
  },
  {
    type: "expense",
    isRecurrent: false,
    tag: {
      color: "#0000ff",
      name: "Prelievo",
    },
    amount: 1000,
  },
  {
    type: "expense",
    isRecurrent: false,
    tag: {
      color: "#003912",
      name: "Macchina",
    },
    amount: 2000,
  },
]

export default function Analysis() {
  return (
    <article className={s.root}>
      <Container>
        <header className={s.header}>
          <h2 className={s.headerTitle}>Analisi uscite</h2>
        </header>
        <Chart data={data} />
      </Container>
    </article>
  )
}
