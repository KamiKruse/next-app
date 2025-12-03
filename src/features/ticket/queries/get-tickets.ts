import { initialTickets } from '@/data'
import { Ticket } from '../types'
export default async function GetTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return new Promise((resolve) => {
    resolve(initialTickets)
  })
}
