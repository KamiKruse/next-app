import { Separator } from '@/components/ui/separator'

type HeadingPropsType = {
  title: string
  description?: string
}
export default function Heading({ title, description }: HeadingPropsType) {
  return (
    <>
      <div>
        <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      <Separator orientation='horizontal' />
    </>
  )
}
