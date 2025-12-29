'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { setCookie } from '@/app/actions/cookies'
import {
  ErrorToActionStateType,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/error-to-action-state'
import prisma from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'
import { toCents } from '@/utils/currency'

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is Required'),
  bounty: z.coerce.number().positive(),
})

const upsertTicket = async (
  id: string | undefined,
  _actionState: ErrorToActionStateType,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty')
    })

    const updatedData = {
      ...data,
      bounty: toCents(data.bounty)
    }
    await prisma.ticket.upsert({
      where: {
        id: id || '',
      },
      update: updatedData,
      create: updatedData,
    })
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  revalidatePath(ticketsPath())
  if (id) {
    await setCookie('toast', 'Ticket edited successfully')
    redirect(ticketPath(id))
  }
  return toActionState('SUCCESS', 'Ticket created')
}

export { upsertTicket }
