import { useEffect, useState } from "react"
import { Chart } from "."
import Container from "../container"
import Title from "../title"
import { useFirebaseCollections } from "../firebase-context"

export default function Analysis() {
  const { moves, loadingData } = useFirebaseCollections()

  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    const expensesMoves = moves.filter((move) => move.type === "uscita")
    setExpenses(expensesMoves)
  }, [moves])

  return (
    <article className="my-section-gap">
      <Container>
        <header className="mb-5">
          <Title>Analisi uscite</Title>
        </header>
        {loadingData ? (
          <span>Loading...</span>
        ) : (
          <>
            {expenses.length > 0 ? (
              <Chart data={expenses} />
            ) : (
              <small className="text-gray-400 mt-7 block">Non ci sono uscite disponibili</small>
            )}
          </>
        )}
      </Container>
    </article>
  )
}
