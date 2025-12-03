import { Suspense } from 'react'
import Heading from '@/components/heading'
import TicketList from '@/features/ticket/components/ticket-list'
import Loading from './[ticketId]/loading'

export default async function TicketsPage() {
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading title='Tickets' description='All Tickets page' />

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </div>
  )
}
