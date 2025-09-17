import Link from 'next/link'
import Placeholder from '@/components/placeholder'
import { Button } from '@/components/ui/button'
import { initialTickets } from '@/data'
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
      <div className='flex justify-center items-center flex-1'>
        <Placeholder
          label='Ticket Not Found'
          button={
            <Button asChild variant='outline'>
              <Link href={ticketsPath()}>Go to tickets</Link>
            </Button>
          }
        />
      </div>
    )
  }
  return (
    <div>
      <div className='mb-16'>TicketPage:</div>
      <h2> {ticket.title}</h2>
      <p>{ticket.content}</p>
      <h1>{ticket.status}</h1>
    </div>
  )
}
