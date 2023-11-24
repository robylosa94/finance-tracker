"use client"

import { useRef, useState } from "react"
import Modal from "../modal"
import FormField from "../form"
import { useToggleModalAddTag } from "../context"
import Button from "../button"
import s from "./modal-add.module.css"

//Firebase
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function MovesModalAdd() {
  const formRef = useRef<HTMLFormElement>(null)

  const toggleModalAddTag = useToggleModalAddTag()

  const addMoveHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const colorInput = formRef.current?.querySelector("[name=color]") as HTMLInputElement
    const nameInput = formRef.current?.querySelector("[name=name]") as HTMLInputElement
    const typeSelect = formRef.current?.querySelector("[name=type]") as HTMLSelectElement

    const data = {
      color: colorInput.value,
      name: nameInput.value,
      type: typeSelect.value,
    }

    try {
      const tagsCollection = collection(db, "tags")
      const docSnap = await addDoc(tagsCollection, data)
      alert("Saved!")
      location.reload()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <Modal title="Aggiungi tag" toggle={toggleModalAddTag}>
      <form onSubmit={addMoveHandler} ref={formRef}>
        <FormField type="color" title="Colore" name="color" required />
        <FormField title="Nome" name="name" autoFocus required />
        <FormField type="select" title="Tipologia" name="type" required>
          <option selected disabled></option>
          <option value="uscita">uscita</option>
          <option value="entrata">entrata</option>
        </FormField>
        <div className={s.buttons}>
          <Button Component="button" type="submit">
            Salva
          </Button>
          <Button Component="button" type="button" variant="outlined" onClick={toggleModalAddTag}>
            Annulla
          </Button>
        </div>
      </form>
    </Modal>
  )
}
