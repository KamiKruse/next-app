import GetTickets from '../queries/get-tickets'
import TicketItem from './ticket-item'

export default async function TicketList() {
  const tickets = await GetTickets()
  const ticketList = tickets.map((ticket) => (
    <TicketItem key={ticket.id} ticket={ticket} />
  ))

  return (
    <div className='flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top'>
      {ticketList}
    </div>
  )
}
