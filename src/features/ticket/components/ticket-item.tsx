import clsx from 'clsx'
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Ticket } from '@/generated/client'
import { editTicketPath, ticketPath } from '@/paths'
import { toCurrency } from '@/utils/currency'
import { TICKET_ICONS } from '../constants'
import { OptionsMenu } from './options-menu'

type TicketItemProps = {
  ticket: Ticket
  isDetail?: boolean
}

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild variant='outline' size='icon'>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className='h-4 w-4' />
      </Link>
    </Button>
  )

  const editButton = (
    <Button asChild variant='outline' size='icon'>
      <Link prefetch href={editTicketPath(ticket.id)}>
        <LucidePencil className='h-4 w-4' />
      </Link>
    </Button>
  )
  const moreOptionsMenu = (
    <OptionsMenu
      ticket={ticket}
      trigger={
        <Button variant='outline' size='icon'>
          <LucideMoreVertical className='h-4 w-4' />
        </Button>
      }
    />
  )
  return (
    <div
      className={clsx('w-full flex gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-x-2'>
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className='truncate'>{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <p className='text-muted-foreground text-sm'>{ticket.deadline}</p>
          <p className='text-muted-foreground text-sm'>
            {toCurrency(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className='flex flex-col gap-y-1'>
        {isDetail ? (
          <>
            {editButton}
            {moreOptionsMenu}
          </>
        ) : (
          <>
            {detailButton} {editButton}
          </>
        )}
      </div>
    </div>
  )
}
