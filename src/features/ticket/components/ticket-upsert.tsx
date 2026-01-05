'use client'

import { useActionState, useRef } from 'react'
import { DatePicker, imperativeHandleFromDatePicker } from '@/components/date-picker'
import { FieldErrors } from '@/components/form/field-errors'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/error-to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Ticket } from '@/generated/client'
import { fromCents } from '@/utils/currency'
import { upsertTicket } from '../actions/upsert'

type TicketUpsertProps = {
  ticket?: Ticket
}

const TicketUpsert = ({ ticket }: TicketUpsertProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  )

  const dateImperativeHandleRef = useRef<imperativeHandleFromDatePicker>(
    null
  ) 

  const handleSuccess = () => {
    dateImperativeHandleRef.current?.reset()
  }
  return (
    <Form action={action} actionState={actionState} onSuccess = {handleSuccess}>
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

      <div className='flex gap-x-8 mb-1'>
        <div className='w-1/2'>
          <Label htmlFor='deadline' className='block mb-4'>
            Deadline
          </Label>
          <DatePicker
           
            id='deadline'
            name='deadline'
            defaultValue={
              (actionState.payload?.get('deadline') as string) ??
              ticket?.deadline
            }
            imperativeHandle={dateImperativeHandleRef}
          />
          <FieldErrors actionState={actionState} name={'deadline'} />
        </div>
        <div className='w-1/2'>
          <Label htmlFor='bounty' className='block mb-4'>
            Bounty ($)
          </Label>
          <Input
            id='bounty'
            name='bounty'
            type='number'
            step='0.01'
            defaultValue={
              (actionState.payload?.get('bounty') as string) ??
              (ticket?.bounty ? fromCents(ticket.bounty) : '')
            }
          />
          <FieldErrors actionState={actionState} name={'bounty'} />
        </div>
      </div>
      <SubmitButton label={ticket ? 'Edit Ticket' : 'Create Ticket'} />
    </Form>
  )
}
export { TicketUpsert }
