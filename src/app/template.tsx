import { RedirectToast } from '@/components/redirect-toast'

type RootTemplatePropTypes = {
  children: React.ReactNode
}

export default function RootTemplate({ children }: RootTemplatePropTypes) {
  return (
    <>
      < >{children}</>
      <RedirectToast />
    </>
  )
}
