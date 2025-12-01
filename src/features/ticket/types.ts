export type TicketStatus = 'OPEN' | 'CLOSED' | 'IN_PROGRESS'
export type Ticket = {
  id: number,
  title: string,
  content: string,
  status: TicketStatus
}
