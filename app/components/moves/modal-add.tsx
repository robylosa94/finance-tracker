"use client"

import { useEffect, useRef, useState } from "react"
import Modal from "../modal"
import FormField from "../form"
import { MoveTypeTypes, TagTypes } from "@/lib/types"
import { useToggleModalAddExpense, useToggleModalAddIncome } from "../context"
import Button from "../button"
import s from "./modal-add.module.css"

//Firebase
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { floatingConverter } from "@/lib/helpers"
import { useFirebaseCollections } from "../firebase-context"

interface Props {
  type: MoveTypeTypes
}

export default function MovesModalAdd({ type }: Props) {
  const IS_EXPENSE = type === "uscita"

  const formRef = useRef<HTMLFormElement>(null)
  const { tags } = useFirebaseCollections()
  const [tagsForType, setTagsForType] = useState<TagTypes[]>([])

  const toggleModalAddExpense = useToggleModalAddExpense()
  const toggleModalAddIncome = useToggleModalAddIncome()

  const addMoveHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const amountInput = formRef.current?.querySelector("[name=amount]") as HTMLInputElement
    const tagInput = formRef.current?.querySelector("[name=tag]:checked") as HTMLInputElement
    const recurrentInput = formRef.current?.querySelector("[name=recurrent]") as HTMLInputElement

    const data = {
      type: type,
      amount: floatingConverter(amountInput.value),
      tag: {
        color: tagInput.getAttribute("data-color"),
        name: tagInput.value,
      },
      isRecurrent: recurrentInput ? recurrentInput.checked : false,
      createdAt: new Date(),
    }

    try {
      const movesCollection = collection(db, "moves")
      const docSnap = await addDoc(movesCollection, data)
      alert("Saved!")
      location.reload()
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (IS_EXPENSE) {
      const expenseTags = tags.filter((tag) => tag.type === "uscita")
      setTagsForType(expenseTags)
    } else {
      const incomeTags = tags.filter((tag) => tag.type === "entrata")
      setTagsForType(incomeTags)
    }
  }, [tags])

  return (
    <Modal
      title={`Aggiungi ${IS_EXPENSE ? "uscita" : "entrata"}`}
      toggle={IS_EXPENSE ? toggleModalAddExpense : toggleModalAddIncome}
    >
      <form onSubmit={addMoveHandler} ref={formRef}>
        <input type="hidden" name="type" value={type} />
        <FormField type="currency" title="Importo" name="amount" autoFocus required />
        <span>Tag*</span>
        {tagsForType.map((tag: any, idx) => (
          <label key={idx}>
            <input type="radio" name="tag" value={tag.name} data-color={tag.color} required />
            <span>{tag.name}</span>
          </label>
        ))}
        {IS_EXPENSE && <FormField type="checkbox" nolabel text="Ricorrente" name="recurrent" />}
        <div className={s.buttons}>
          <Button Component="button" type="submit">
            Salva
          </Button>
          <Button
            Component="button"
            type="button"
            variant="outlined"
            onClick={IS_EXPENSE ? toggleModalAddExpense : toggleModalAddIncome}
          >
            Annulla
          </Button>
        </div>
      </form>
    </Modal>
  )
}
