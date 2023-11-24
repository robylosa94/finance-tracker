"use client"

import { useEffect, useState } from "react"
import Container from "../components/container"
import Title from "../components/title"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Button from "../components/button"
import { IoMdAdd } from "react-icons/io"
import dynamic from "next/dynamic"
import { useSiteContext, useToggleModalAddTag } from "../components/context"

const ModalAddTag = dynamic(() => import("../components/tags/modal-add"), { ssr: false })

export default function Tag() {
  const { isModalAddTagOpen } = useSiteContext()
  const toggleModalAddTag = useToggleModalAddTag()
  const [tags, setTags] = useState<any[]>([])

  useEffect(() => {
    const getTags = async () => {
      const tagsCollection = collection(db, "tags")
      const tagsQuery = query(tagsCollection, orderBy("name"))
      const querySnap = await getDocs(tagsQuery)
      const data = querySnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      setTags(data)
    }

    getTags()
  }, [])

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
