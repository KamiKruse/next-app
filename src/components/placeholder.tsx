import { LucideOctagonAlert } from 'lucide-react'
import { cloneElement } from 'react'

type PlaceholderProps = {
  label: string
  icon?: React.ReactElement<{ className?: string }>
  button?: React.ReactElement<{ className?: string }>
}

export default function Placeholder({
  label,
  icon = <LucideOctagonAlert />,
  button = <div />,
}: PlaceholderProps) {
  return (
    <div className='flex flex-col items-center self-center justify-center flex-1 '>
      <div className='flex flex-col items-center gap-y-4'>
        {cloneElement(icon, {
          className: 'h-16 w-16',
        })}
        <h2 className='text-2xl'>{label}</h2>
        {cloneElement(button, {
          className: 'h-11',
        })}
      </div>
    </div>
  )
}
