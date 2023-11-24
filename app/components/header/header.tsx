"use client"

import Image from "next/image"
import s from "./header.module.css"
import Container from "../container"
import { IoMdMenu } from "react-icons/io"
import { homeUrl } from "@/lib/urls"
import Link from "next/link"
import { useSiteContext, useToggleMenu } from "../context"
import dynamic from "next/dynamic"

const Menu = dynamic(() => import("../menu"), { ssr: false })

export default function Header() {
  const { isMenuOpen } = useSiteContext()
  const toggleMenu = useToggleMenu()

  return (
    <>
      <header className={s.root}>
        <Container className={s.container}>
          <Link href={homeUrl()} className={s.user}>
            <Image src="" alt="" className={s.userAvatar} />
            <span>Ciao, Roberto Losa!</span>
          </Link>
          <button className={s.burger} aria-label="Apri menu" onClick={toggleMenu}>
            <IoMdMenu className="w-7 h-7" />
          </button>
        </Container>
      </header>
      {isMenuOpen && <Menu />}
    </>
  )
}
