import Image from "next/image"
import s from "./header.module.css"
import Container from "../container"
import { IoMdMenu } from "react-icons/io"

export default function Header() {
  return (
    <header className={s.root}>
      <Container className={s.container}>
        <div className={s.user}>
          <Image src="" alt="" className={s.userAvatar} />
          <span>Ciao, Roberto Losa!</span>
        </div>
        <button className={s.burger}>
          <IoMdMenu className="w-7 h-7" />
        </button>
      </Container>
    </header>
  )
}
