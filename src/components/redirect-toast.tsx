'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { deleteCookie, getCookie } from '@/app/actions/cookies'

const RedirectToast = () => {
  const pathname = usePathname()
  useEffect(() => {
    const getCookieFromStore = async () => {
      const cookieMessage = await getCookie('toast')
      if (cookieMessage) {
        toast.success(cookieMessage)
        await deleteCookie('toast')
      }
    }
    getCookieFromStore()
  }, [pathname])
  return null
}
export { RedirectToast }
