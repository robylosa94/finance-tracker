import Modal from "../modal"
import FormField from "../form"
import { MoveTypeTypes } from "@/lib/types"
import { useToggleModalAddExpense, useToggleModalAddIncome } from "../context"

interface Props {
  type: MoveTypeTypes
}

export default function MovesModalAdd({ type }: Props) {
  const toggleModalAddExpense = useToggleModalAddExpense()
  const toggleModalAddIncome = useToggleModalAddIncome()

  return (
    <Modal
      title={`Aggiungi ${type === "expense" ? "uscita" : "entrata"}`}
      toggle={type === "expense" ? toggleModalAddExpense : toggleModalAddIncome}
    >
      <form>
        <input type="hidden" name="type" value={type} />
        <FormField type="currency" title="Importo" name="amount" required />
      </form>
    </Modal>
  )
}
