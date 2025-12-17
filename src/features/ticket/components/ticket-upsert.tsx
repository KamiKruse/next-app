'use client'
import { useActionState } from 'react'
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
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: '',
      fieldErrors: {}
    }
  )
  return (
    <form action={action} className='flex flex-col gap-y-4'>
      <Label htmlFor='title'>Title</Label>
      <Input
        id='title'
        name='title'
        type='text'
        defaultValue={
          (actionState.payload?.get('title') as string) ?? ticket?.title
        }
      />

      <Label htmlFor='content'>Content</Label>
      <Textarea
        id='content'
        name='content'
        defaultValue={
          (actionState.payload?.get('content') as string) ?? ticket?.content
        }
      />

      <SubmitButton label={ticket ? 'Edit Ticket' : 'Create Ticket'} />

      {actionState.message}
    </form>
  )
}
export { TicketUpsert }
