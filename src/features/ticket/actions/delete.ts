'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setCookie } from '@/app/actions/cookies'
import prisma from '@/lib/prisma'
import { ticketsPath } from '@/paths'
export async function handleDelete(id: string) {
  await prisma.ticket.delete({
    where: {
      id,
    },
  })
  revalidatePath(ticketsPath())
  await setCookie('toast', 'Ticket deleted')
  redirect(ticketsPath())
}
