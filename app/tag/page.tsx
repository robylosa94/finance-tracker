"use client"

import Container from "../components/container"
import Title from "../components/title"

import Button from "../components/button"
import { IoMdAdd } from "react-icons/io"
import dynamic from "next/dynamic"
import { useSiteContext, useToggleModalAddTag } from "../components/context"
import { useFirebaseCollections } from "../components/firebase-context"

const ModalAddTag = dynamic(() => import("../components/tags/modal-add"), { ssr: false })

export default function Tag() {
  const { tags } = useFirebaseCollections()

  const { isModalAddTagOpen } = useSiteContext()
  const toggleModalAddTag = useToggleModalAddTag()

  return (
    <main>
      <section className="my-section-gap">
        <Container>
          <header className="mb-5">
            <Title Component="h1">Gestione tag</Title>
          </header>
          {tags.map((tag: any, idx) => (
            <div key={idx}>
              <span>{tag.color}</span>
              <span>{tag.name}</span>
            </div>
          ))}
          <Button Component="button" onClick={toggleModalAddTag}>
            <IoMdAdd />
            Crea
          </Button>
        </Container>
      </section>
      {isModalAddTagOpen && <ModalAddTag />}
    </main>
  )
}
