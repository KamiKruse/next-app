import prisma from '@/lib/prisma'

export default async function GetTicket(ticketId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  })
}
