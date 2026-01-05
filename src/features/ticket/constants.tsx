import {
  LucideCircle,
  LucideCircleCheck,
  LucideCircleEllipsis,
} from 'lucide-react'

export const TICKET_ICONS = {
  OPEN: <LucideCircle />,
  IN_PROGRESS: <LucideCircleEllipsis />,
  CLOSED: <LucideCircleCheck />,
}

export const TICKET_STATUS_LABELS = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  IN_PROGRESS: 'In Progress'
}
