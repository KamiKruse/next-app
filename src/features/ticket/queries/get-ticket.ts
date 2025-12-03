import { initialTickets } from '@/data'
import { Ticket } from '../types'

export default async function GetTicket(
  ticketId: string
): Promise<Ticket | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const maybeTicket = initialTickets.find(
    (ticket) => parseInt(ticketId) === ticket.id
  )
   
  return new Promise((resolve) => {
    resolve(maybeTicket || null)
  })
}
