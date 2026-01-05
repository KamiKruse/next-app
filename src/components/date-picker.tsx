'use client'

import { format } from 'date-fns'
import { LucideCalendar } from 'lucide-react'
import { useImperativeHandle, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export type imperativeHandleFromDatePicker = {
  reset: () => void
}

type DatePickerProps = {
  id: string
  name: string
  defaultValue?: string | undefined
  imperativeHandle?: React.Ref<imperativeHandleFromDatePicker> | undefined
}
const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandle,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  )
  useImperativeHandle(imperativeHandle, ()=>({
    reset : ()=> setDate(new Date()),
  }))
  const [open, setOpen] = useState(false)
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''

  const handleSelect = (date: Date | undefined) => {
    setDate(date)
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='w-full' id={id} asChild>
        <Button
          variant='outline'
          data-empty={!date}
          className='justify-start text-left font-normal'
        >
          <LucideCalendar />
          {formattedDate}
          <input type='hidden' name={name} value={formattedDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}
export { DatePicker }
