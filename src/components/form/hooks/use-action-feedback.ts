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
    if(!isLoaded.current){
      isLoaded.current = true
      return
    }
    if (actionState.timeStamp !== prevTimeStamp.current) {
      prevTimeStamp.current = actionState.timeStamp
      if (actionState.message === 'SUCCESS') {
        options.onSuccess?.({ actionState })
      }
      if (actionState.message === 'ERROR') {
        options.onError?.({ actionState })
      }
    }
    // if (actionState.message === 'SUCCESS') {
    //   options.onSuccess?.({ actionState })
    // }
    // if (actionState.message === 'ERROR') {
    //   options.onError?.({ actionState })
    // }
  }, [actionState, options])
}

export { useActionFeedback }
