'use client'
import { SubmitButton } from '@/components/form/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Ticket } from '@/generated/client'
import { upsertTicket } from '../actions/upsert'

type TicketUpsertProps = {
  ticket?: Ticket
}

const TicketUpsert = ({ ticket }: TicketUpsertProps) => {
  return (
    <form
      action={upsertTicket.bind(null, ticket?.id)}
      className='flex flex-col gap-y-4'
    >
      <Label htmlFor='title'>Title</Label>
      <Input id='title' name='title' type='text' defaultValue={ticket?.title} />

      <Label htmlFor='content'>Title</Label>
      <Textarea id='content' name='content' defaultValue={ticket?.content} />

      <SubmitButton label={ticket ? 'Edit Ticket' : 'Create Ticket'} />
    </form>
  )
}
export { TicketUpsert }
