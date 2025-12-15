import { notFound } from 'next/navigation'
import { CardCompact } from '@/components/card-compact'
import { TicketUpsert } from '@/features/ticket/components/ticket-upsert'
import GetTicket from '@/features/ticket/queries/get-ticket'

interface EditTicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}
const EditTicketPage = async ({ params }: EditTicketPageProps) => {
  const ticketParams = await params
  const ticket = await GetTicket(ticketParams.ticketId)
  if (!ticket) {
    notFound()
  }
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <CardCompact
        title={ticket.title}
        description='Ticket Edit'
        className='w-full max-w-[420px] animate-fade-in-from-top'
        content={<TicketUpsert ticket={ticket} />}
      />
    </div>
  )
}

export default EditTicketPage
