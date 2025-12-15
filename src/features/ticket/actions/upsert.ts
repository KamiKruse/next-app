'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { ticketsPath } from '@/paths'

const upsertTicket = async (id: string | undefined, formData: FormData) => {
  const title = formData.get('title')
  const content = formData.get('content')
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error('Invalid form submission')
  }
  const data = {
    title,
    content,
  }

  await prisma.ticket.upsert({
    where: {
      id: id || '',
    },
    update: data,
    create: data,
  })
  // await prisma.ticket.update({
  //   where: {
  //     id,
  //   },
  //   data: {
  //     title: data.title as string,
  //     content: data.content as string,
  //   },
  // })
  revalidatePath(ticketsPath())
  if (id) {
    redirect(ticketsPath())
  }
}

export { upsertTicket }
