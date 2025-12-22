'use server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { ticketsPath } from '@/paths'

const createTicket = async (formData: FormData) => {
  const title = formData.get('title')
  const content = formData.get('content')
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error('Invalid form submission')
  }
  const data = {
    title,
    content,
  }
  await prisma.ticket.create({
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  })
  revalidatePath(ticketsPath())
}
export { createTicket }
