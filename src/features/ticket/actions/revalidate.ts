'use server'
import { revalidatePath } from 'next/cache'
import { ticketsPath } from '@/paths'

export async function revalidateTickets() {
  revalidatePath(ticketsPath())
}
