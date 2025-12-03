import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma/client'

const prisma = new PrismaClient()

const tickets = [
  {
    title: 'Ticket1',
    content: 'First Ticket',
    status: 'CLOSED' as const,
  },
  {
    title: 'Ticket2',
    content: 'Second Ticket',
    status: 'OPEN' as const,
  },
  {
    title: 'Ticket3',
    content: 'Third Ticket',
    status: 'IN_PROGRESS' as const,
  },
]

const seed = async () => {
  const t0 = performance.now()
  console.log('DB Seeding Started...')
  await prisma.ticket.deleteMany()

  await prisma.ticket.createMany({
    data: tickets,
  })

  const t1 = performance.now()
  console.log(`DB Seeding Finished in... ${t1 - t0}`)
}

seed()
