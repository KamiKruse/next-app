import { Suspense } from 'react'
import Heading from '@/components/heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TicketForm } from '@/features/ticket/components/create-ticket-form'
import TicketList from '@/features/ticket/components/ticket-list'
import Loading from './[ticketId]/loading'

export default async function TicketsPage() {
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading title='Tickets' description='All Tickets page' />
      <Card className='w-full max-w-[420px] self-center'>
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketForm />
        </CardContent>
      </Card>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </div>
  )
}
