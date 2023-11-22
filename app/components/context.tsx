"use client"

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

const initialContext = {
  isModalAddExpenseOpen: false,
  isModalAddIncomeOpen: false,
}

const SiteContext = createContext({
  context: initialContext,
  setContext: (() => null) as Dispatch<
    SetStateAction<{ isModalAddExpenseOpen: boolean; isModalAddIncomeOpen: boolean }>
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
