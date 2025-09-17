import {
  LucideCircle,
  LucideCircleCheck,
  LucideCircleEllipsis,
} from 'lucide-react'
import Link from 'next/link'
import Heading from '@/components/heading'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { initialTickets } from '@/data'
import { ticketPath } from '@/paths'

const TICKET_ICONS = {
  OPEN: <LucideCircle />,
  IN_PROGRESS: <LucideCircleEllipsis />,
  CLOSED: <LucideCircleCheck />,
}

export default function TicketsPage() {
  const tickets = initialTickets.map((ticket) => (
    <Card key={ticket.id} className='w-full max-w-[420]'>
      <CardHeader>
        <CardTitle className='flex gap-x-2'>
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className='truncate'>{ticket.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='line-clamp-3 whitespace-break-spaces'>
        {ticket.content}
      </CardContent>
      <CardFooter>
        <Link href={ticketPath(ticket.id)} className='text-sm underline'>
          View
        </Link>
      </CardFooter>
    </Card>
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
