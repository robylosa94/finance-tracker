"use client"

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

const initialContext = {
  isMenuOpen: false,
  isModalAddExpenseOpen: false,
  isModalAddIncomeOpen: false,
  isModalAddTagOpen: false,
}

const SiteContext = createContext({
  context: initialContext,
  setContext: (() => null) as Dispatch<
    SetStateAction<{
      isMenuOpen: boolean
      isModalAddExpenseOpen: boolean
      isModalAddIncomeOpen: boolean
      isModalAddTagOpen: boolean
    }>
  >,
})

type Props = {
  children: React.ReactNode
}

export function SiteContextProvider({ children }: Props) {
  const [context, setContext] = useState({
    ...initialContext,
  })
  const [initContext, setInitContext] = useState(false)

  useEffect(() => {
    if (initContext === false) {
      setInitContext(true)
    }
  }, [initContext, context, setContext])

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

export function useToggleMenu() {
  const {
    context: { isMenuOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleMenu() {
    setContext((prevState) => {
      return { ...prevState, isMenuOpen: !isMenuOpen }
    })
  }
  return toggleMenu
}

export function useToggleModalAddExpense() {
  const {
    context: { isModalAddExpenseOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleModalAddExpense() {
    setContext((prevState) => {
      return { ...prevState, isModalAddExpenseOpen: !isModalAddExpenseOpen }
    })
  }
  return toggleModalAddExpense
}

export function useToggleModalAddIncome() {
  const {
    context: { isModalAddIncomeOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleModalAddIncome() {
    setContext((prevState) => {
      return { ...prevState, isModalAddIncomeOpen: !isModalAddIncomeOpen }
    })
  }
  return toggleModalAddIncome
}

export function useToggleModalAddTag() {
  const {
    context: { isModalAddTagOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleModalAddTag() {
    setContext((prevState) => {
      return { ...prevState, isModalAddTagOpen: !isModalAddTagOpen }
    })
  }
  return toggleModalAddTag
}
