import { toast } from "sonner"
import { useActionFeedback } from "./hooks/use-action-feedback"
import { ErrorToActionStateType } from "./utils/error-to-action-state"

type FormPropType = {
  action: (payload: FormData) => void
  children: React.ReactNode
  actionState: ErrorToActionStateType
  onSuccess?: (actionState: ErrorToActionStateType) => void
  onError?: (actionState: ErrorToActionStateType) => void
}

const Form = ({ action, actionState, children, onSuccess, onError }: FormPropType) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message)
      }
      onSuccess?.(actionState)
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message)
      }
      onError?.(actionState)
    },
  })
  return (
    <form action={action} className='flex flex-col gap-y-4'>
      {children}
    </form>
  )
}
export { Form }
