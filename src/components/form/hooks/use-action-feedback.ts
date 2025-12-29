import { useEffect, useRef } from 'react'
import { ErrorToActionStateType } from '../utils/error-to-action-state'

type OnArgsType = {
  actionState: ErrorToActionStateType
}

type UseActionFeedbackOptionsType = {
  onSuccess?: (onArgs: OnArgsType) => void
  onError?: (onArgs: OnArgsType) => void
}

const useActionFeedback = (
  actionState: ErrorToActionStateType,
  options: UseActionFeedbackOptionsType
) => {
  const prevTimestamp = useRef(actionState.timeStamp)
  const isUpdate = prevTimestamp.current !== actionState.timeStamp
  useEffect(() => {
    if (!isUpdate) {
      return
    }
    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState })
    }
    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState })
    }
    prevTimestamp.current = actionState.timeStamp
  }, [isUpdate, actionState, options])
}

export { useActionFeedback }
