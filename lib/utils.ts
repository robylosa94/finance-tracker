export const currencyFormatter = (amount: number) => {
  const formatter = Intl.NumberFormat("it-IT", {
    currency: "EUR",
    style: "currency",
  })

  return formatter.format(amount)
}

export const floatingConverter = (amount: string) => {
  const amountWithoutDots = amount.replace(/\./g, "")
  return parseFloat(amountWithoutDots.replace(",", "."))
}
