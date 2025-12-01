import Heading from '@/components/heading'
import { initialTickets } from '@/data'
import TicketItem from '@/features/ticket/components/ticket-item'

export default function TicketsPage() {
  const tickets = initialTickets.map((ticket) => (
    <TicketItem key={ticket.id} ticket={ticket} />
  ))
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading title='Tickets' description='All Tickets page' />
      <div className='flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top'>
        {tickets}
      </div>
    </div>
  )
}
