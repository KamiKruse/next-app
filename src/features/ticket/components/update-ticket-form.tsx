import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Ticket } from '@/generated/client'
import { updateTicket } from '../actions/update'

type EditTicketFormProps = {
  ticket: Ticket
}
const EditTicketForm = ({ ticket }: EditTicketFormProps) => {
  return (
    <form action={updateTicket.bind(null, ticket.id)} className='flex flex-col gap-y-4'>
      <Label htmlFor='title'>Title</Label>
      <Input id='title' name='title' type='text' defaultValue={ticket.title} />

      <Label htmlFor='content'>Title</Label>
      <Textarea id='content' name='content' defaultValue={ticket.content} />

      <Button type='submit'>Update Ticket</Button>
    </form>
  )
}
export { EditTicketForm }
