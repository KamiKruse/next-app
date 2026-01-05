'use server'

import { revalidatePath } from 'next/cache'
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/error-to-action-state'
import { TicketStatus } from '@/generated/enums'
import prisma from '@/lib/prisma'
import { ticketsPath } from '@/paths'
export async function handleStatusUpdate(id: string, status: TicketStatus) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
    revalidatePath(ticketsPath())
    return toActionState('SUCCESS', 'Status Updated')
  } catch (error) {
    fromErrorToActionState(error)
  }
}
