import { IoMdClose } from "react-icons/io"
import Container from "../container"
import s from "./modal.module.css"
import { MouseEventHandler } from "react"

interface Props {
  title: string
  toggle: MouseEventHandler
  children: React.ReactNode
}

export default function Modal({ title, toggle, children }: Props) {
  return (
    <div className={s.root} onClick={toggle}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.inner} onClick={(e) => e.stopPropagation()}>
            <div className={s.header}>
              <strong className={s.headerTitle}>{title}</strong>
              <button aria-label="Chiudi modale" onClick={toggle}>
                <IoMdClose className="w-7 h-7" />
              </button>
            </div>
            <div className={s.content}>{children}</div>
          </div>
        </div>
      </Container>
    </div>
  )
}
