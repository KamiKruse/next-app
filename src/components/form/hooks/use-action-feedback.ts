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
  const prevTimeStamp = useRef(actionState.timeStamp)
  const isLoaded = useRef(false)
  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true
      return
    }
    if (actionState.timeStamp !== prevTimeStamp.current) {
      prevTimeStamp.current = actionState.timeStamp
      if (actionState.status === 'SUCCESS') {
        options.onSuccess?.({ actionState })
      }
      if (actionState.status === 'ERROR') {
        options.onError?.({ actionState })
      }
    }
    // if (actionState.status === 'SUCCESS') {
    //   options.onSuccess?.({ actionState })
    // }
    // if (actionState.status === 'ERROR') {
    //   options.onError?.({ actionState })
    // }
  }, [actionState, options])
}

export { useActionFeedback }
