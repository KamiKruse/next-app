'use client'

import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { FieldErrors } from '@/components/form/field-errors'
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/error-to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Ticket } from '@/generated/client'
import { upsertTicket } from '../actions/upsert'

type TicketUpsertProps = {
  ticket?: Ticket
}

const TicketUpsert = ({ ticket }: TicketUpsertProps) => {
  // const router = useRouter()
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  )

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      console.log(actionState.message)
      // if (!ticket) {
      //   setTimeout(() => {
      //     router.refresh()
      //   }, 100)
      // }
    },
    onError: ({ actionState }) => {
      console.log(actionState.message)
    },
  })

  return (
    <form
      key={actionState.timeStamp}
      action={action}
      className='flex flex-col gap-y-4'
    >
      <Label htmlFor='title'>Title</Label>
      <Input
        id='title'
        name='title'
        type='text'
        defaultValue={
          (actionState.payload?.get('title') as string) ?? ticket?.title
        }
      />
      <FieldErrors actionState={actionState} name={'title'} />

      <Label htmlFor='content'>Content</Label>
      <Textarea
        id='content'
        name='content'
        defaultValue={
          (actionState.payload?.get('content') as string) ?? ticket?.content
        }
      />
      <FieldErrors actionState={actionState} name={'content'} />

      <SubmitButton label={ticket ? 'Edit Ticket' : 'Create Ticket'} />

      {actionState.message}
    </form>
  )
}
export { TicketUpsert }
