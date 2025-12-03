import { notFound } from 'next/navigation'
import TicketItem from '@/features/ticket/components/ticket-item'
import GetTicket from '@/features/ticket/queries/get-ticket'

interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

export default async function TicketPage({ params }: TicketPageProps) {
  const ticketParams = await params
  const ticket = await GetTicket(ticketParams.ticketId)
  if (!ticket) {
    notFound()
  }
  return (
    <div className='flex justify-center animate-fade-in-from-top'>
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}
