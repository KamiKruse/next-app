export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { CardCompact } from '@/components/card-compact'
import Heading from '@/components/heading'
import TicketList from '@/features/ticket/components/ticket-list'
import { TicketUpsert } from '@/features/ticket/components/ticket-upsert'
import Loading from './[ticketId]/loading'

export default async function TicketsPage() {
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading title='Tickets' description='All Tickets page' />
      <CardCompact
        title='Create Ticket'
        description='A new ticket will be created'
        className='w-full max-w-[420px] self-center'
        content={<TicketUpsert />}
      />
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </div>
  )
}
