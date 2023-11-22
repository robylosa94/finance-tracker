import Container from "../container"
import s from "./latest.module.css"
import ArrowLink from "../arrow-link"
import MovesCard from "./card"

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
    type: "income",
    isRecurrent: false,
    tag: {
      color: "#009320",
      name: "Stipendio",
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
]

export default function MovesLatest() {
  return (
    <article className={s.root}>
      <Container>
        <header className={s.header}>
          <h2 className={s.headerTitle}>Ultimi movimenti</h2>
          <ArrowLink href="#">Vedi tutti</ArrowLink>
        </header>
        <ul className={s.list}>
          {data.map((item, idx) => (
            <li key={idx} className={s.item}>
              <MovesCard data={item} />
            </li>
          ))}
        </ul>
      </Container>
    </article>
  )
}
