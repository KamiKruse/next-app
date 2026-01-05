'use client'
import { LucideTrash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { useConfirmDialog } from '@/components/confirm-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ticket, TicketStatus } from '@/generated/client'
import { handleDelete } from '../actions/delete'
import { handleStatusUpdate } from '../actions/update-status'
import { TICKET_STATUS_LABELS } from '../constants'

type OptionsMenuProps = {
  ticket: Ticket
  trigger: React.ReactElement
}

const OptionsMenu = ({ ticket, trigger }: OptionsMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: handleDelete.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className='mr-2 h-4 w-4' />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  })

  const handleDropDownChange = async (value: string) => {
    const promise = handleStatusUpdate(ticket.id, value as TicketStatus)

    toast.promise(promise, {
      loading: 'Updating Status...',
    })
    const result = await promise
    if (result?.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result?.message)
    }
  }
  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleDropDownChange}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => {
        return (
          <DropdownMenuRadioItem key={key} value={key}>
            {TICKET_STATUS_LABELS[key]}
          </DropdownMenuRadioItem>
        )
      })}
    </DropdownMenuRadioGroup>
  )
  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side='right' className='w-56'>
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { OptionsMenu }
