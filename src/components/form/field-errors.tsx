import { ErrorToActionStateType } from "./utils/error-to-action-state"

 type FieldErrorProps = {
   actionState: ErrorToActionStateType
   name: string
 }

const FieldErrors = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors?.[name]?.[0]

  if (!message) {
    return null
  }

  return <span className='text-xs text-red-500'>{message}</span>
}

export {FieldErrors}
