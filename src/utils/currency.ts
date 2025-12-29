import { MyBig } from "@/lib/big"
export const fromCents = (amount: number) => {
  return MyBig(amount).div(100).round(2).toNumber()
}

// Deviated from tutorial. Rounded to 0 as it makes no sense for cents
export const toCents = (amount: number) => {
  return MyBig(amount).mul(100).round(0).toNumber()
}

export const toCurrency = (amount: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(fromCents(amount))
