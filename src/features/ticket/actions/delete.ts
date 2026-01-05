'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setCookie } from '@/app/actions/cookies'
import { fromErrorToActionState } from '@/components/form/utils/error-to-action-state'
import prisma from '@/lib/prisma'
import { ticketsPath } from '@/paths'
export async function handleDelete(id: string) {
  try {
    await prisma.ticket.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())
  await setCookie('toast', 'Ticket deleted')
  redirect(ticketsPath())
}
