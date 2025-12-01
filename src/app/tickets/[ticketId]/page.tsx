import Link from 'next/link'
import Placeholder from '@/components/placeholder'
import { Button } from '@/components/ui/button'
import { initialTickets } from '@/data'
import TicketItem from '@/features/ticket/components/ticket-item'
import { ticketsPath } from '@/paths'


interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

export default async function TicketPage({ params }: TicketPageProps) {
  const ticketParams = await params
  const ticket = initialTickets.find(
    (ticket) => parseInt(ticketParams.ticketId) === ticket.id
  )
  if (!ticket) {
    return (
      <Placeholder
        label='Ticket Not Found'
        button={
          <Button asChild variant='outline'>
            <Link href={ticketsPath()}>Go to tickets</Link>
          </Button>
        }
      />
    )
  }
  return (
    <div className='flex justify-center animate-fade-in-from-top'>
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}
