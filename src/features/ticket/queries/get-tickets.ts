import prisma from '@/lib/prisma'

export default async function GetTickets() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}
