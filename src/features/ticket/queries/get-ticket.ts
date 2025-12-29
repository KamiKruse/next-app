import prisma from '@/lib/prisma'

export default async function GetTicket(ticketId: string) {
  

  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  })
}
