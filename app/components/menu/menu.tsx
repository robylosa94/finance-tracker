import { homeUrl, movesUrl, tagUrl } from "@/lib/urls"
import Container from "../container"
import s from "./menu.module.css"
import Link from "next/link"
import Button from "../button"
import { IoMdClose } from "react-icons/io"
import { useToggleMenu } from "../context"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Route } from "next"

export default function Menu() {
  const pathname = usePathname()
  const toggleMenu = useToggleMenu()
  const linkClassName = (url: Route) => clsx(s.link, { [s.link_active]: pathname === url })

  return (
    <div className={s.root}>
      <Container>
        <div className={s.header}>
          <button aria-label="Chiudi menu" className={s.close} onClick={toggleMenu}>
            <IoMdClose className="w-7 h-7" />
          </button>
        </div>
        <Link href={homeUrl()} className={linkClassName(homeUrl())} onClick={toggleMenu}>
          Dashboard
        </Link>
        <Link href={movesUrl()} className={linkClassName(movesUrl())} onClick={toggleMenu}>
          Tutti i movimenti
        </Link>
        <Link href={tagUrl()} className={linkClassName(tagUrl())} onClick={toggleMenu}>
          Gestione tag
        </Link>
        <Button href="#" variant="danger" className={s.button}>
          Disconnetti
        </Button>
      </Container>
    </div>
  )
}
