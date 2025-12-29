import { z, ZodError } from 'zod'

export type ErrorToActionStateType = {
  status?: 'SUCCESS' | 'ERROR'
  message: string
  fieldErrors: Record<string, string[]> | undefined
  payload?: FormData
  timeStamp: number
}

export const EMPTY_ACTION_STATE: ErrorToActionStateType = {
  message: '',
  fieldErrors: {},
  timeStamp: Date.now(),
}
export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ErrorToActionStateType => {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR',
      message: '',
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
      timeStamp: Date.now(),
    }
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timeStamp: Date.now(),
    }
  } else {
    return {
      status: 'ERROR',
      message: 'Unknown error occurred',
      fieldErrors: {},
      payload: formData,
      timeStamp: Date.now(),
    }
  }
}

export const toActionState = (
  status: ErrorToActionStateType['status'],
  message: string
): ErrorToActionStateType => {
  return { status, message, fieldErrors: {}, timeStamp: Date.now() }
}
