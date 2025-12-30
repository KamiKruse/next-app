import 'dotenv/config'
import { PrismaClient } from '@/generated/client'

const prisma = new PrismaClient()

const tickets = [
  {
    title: 'Ticket1',
    content: 'First Ticket from DB',
    status: 'CLOSED' as const,
    deadline: '2025-12-30',
    bounty: 100,
  },
  {
    title: 'Ticket2',
    content: 'Second Ticket from DB',
    status: 'OPEN' as const,
    deadline: '2025-12-30',
    bounty: 100,
  },
  {
    title: 'Ticket3',
    content: 'Third Ticket from DB',
    status: 'IN_PROGRESS' as const,
    deadline: '2025-12-30',
    bounty: 100,
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
