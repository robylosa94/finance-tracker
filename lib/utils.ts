export const currencyFormatter = (amount: number) => {
  const formatter = Intl.NumberFormat("it-IT", {
    currency: "EUR",
    style: "currency",
  })

  return formatter.format(amount)
}
